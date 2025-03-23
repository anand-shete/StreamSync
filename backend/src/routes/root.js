import fs from "fs";
import rimraf from "rimraf";
import { Router } from "express";
import User from "../models/user.js";
import { generateToken, verifyToken } from "../services/jwt.js";
import { spawn } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { s3Client, upload, getVideoDuration } from "../config/upload.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Video from "../models/video.js";
import { GLOBAL_START_TIME } from "../index.js";

const rootRouter = Router();

rootRouter.get("/auth", async (req, res) => {
  try {
    const token = req.cookies?.["token"];
    if (!token) return res.status(404).json({ message: "Login requried" });

    const user = verifyToken(token);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login Required" });
  }
});

rootRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.countDocuments({ email }).lean();
    if (user) {
      return res
        .status(409)
        .json({ message: "Account aldready exists. Please Login!" });
    }

    await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create Account!" });
  }
});

rootRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required!" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account not found" });

    const check = await user.matchPassword(password);
    if (!check) return res.send(401).json({ message: "Incorrect Password" });

    const token = generateToken(user);
    return res
      .cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Login Success!", id: user._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "User Login Failed" });
  }
});

rootRouter.post("/upload", upload.single("file"), async (req, res) => {
  const videoId = uuidv4();
  const videoPath = req.file.path;
  const outputPath = `./uploads/${videoId}`;
  const hlsPath = `${outputPath}/index.m3u8`;

  try {
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const duration = await getVideoDuration(videoPath);

    const ffmpegArgs = [
      "-i",
      videoPath,
      "-codec:v",
      "libx264",
      "-codec:a",
      "aac",
      "-hls_time",
      "10",
      "-hls_playlist_type",
      "vod",
      "-hls_segment_filename",
      `${outputPath}/segment%03d.ts`,
      "-start_number",
      "0",
      hlsPath,
    ];

    const ffmpegProcess = spawn("ffmpeg", ffmpegArgs);

    ffmpegProcess.on("error", (err) => {
      throw new Error(`FFmpeg spawn error: ${err}`);
    });

    await new Promise((resolve, reject) => {
      ffmpegProcess.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`FFmpeg failed with code: ${code}`));
      });
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `uploads/${videoId}/index.m3u8`,
        Body: fs.createReadStream(hlsPath),
        ContentType: "application/x-mpegURL",
      })
    );

    const segmentFiles = fs
      .readdirSync(outputPath)
      .filter((f) => f.endsWith(".ts"));
    const uploadPromises = segmentFiles.map((file) =>
      s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `uploads/${videoId}/${file}`,
          Body: fs.createReadStream(`${outputPath}/${file}`),
          ContentType: "video/mp2t",
        })
      )
    );
    await Promise.all(uploadPromises);
    const videoUrl = `https://${process.env.BUCKET_NAME}.s3.ap-south-1.amazonaws.com/uploads/${videoId}/index.m3u8`;

    await Video.create({
      videoId,
      title: req.file.originalname,
      hlsUrl: videoUrl,
      duration,
    });

    rimraf.sync(outputPath);
    fs.unlinkSync(videoPath);

    console.log("All files uploaded to S3!");
    return res.json({
      message: "Video converted to HLS format",
      hlsUrl: videoUrl,
      videoId,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to process upload" });
  }
});

rootRouter.get("/logout", (req, res) => {
  res.clearCookie("token").status(200).end();
});

rootRouter.get("/videos", async (req, res) => {
  const videos = await Video.find().lean();
  return res.status(200).json(videos);
});

rootRouter.get("/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    if (!videoId)
      return res.status(404).json({ message: "Video ID not found" });

    const video = await Video.findOne({ videoId }).lean();
    if (!video) return res.status(404).json({ message: "Video Not Found" });

    return res.status(200).json({ message: "AWS S3 URL", video });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting video" });
  }
});

rootRouter.get("/stream/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - GLOBAL_START_TIME) / 1000);

    const video = await Video.findOne({ videoId }).lean();
    if (!video) return res.status(404).json({ message: "Video Not Found" });

    const totalDuration = video.duration;
    if (elapsedSeconds > totalDuration) {
      return res.status(200).json({ message: "Live stream ended" });
    }

    const videoUrl = `${video.hlsUrl}#t=${elapsedSeconds}`;
    return res.json({
      message: "Stream synced to global timeline",
      videoUrl,
      videoId: video.videoId,
      offset: elapsedSeconds,
      imageUrl: video.imageUrl,
      title: video.title,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stream" });
  }
});
export default rootRouter;
