import mongoose from "mongoose";

const videSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  hlsUrl: {
    type: String,
    required: true, // S3 URL to the .m3u8 file
  },
  duration: {
    type: Number,
    required: true, // Duration in seconds (for timeline syncing)
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Video = mongoose.model("video", videSchema);
export default Video;
