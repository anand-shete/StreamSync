import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import rootRoute from "./routes/root.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const GLOBAL_START_TIME = Date.now(); // setting global start time as the server start time

(async () => {
  await connectDB();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/v1/uploads", express.static("uploads"));

  app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
  app.use("/api/v1", rootRoute);

  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
    console.log(
      "Global stream started at:",
      new Date(GLOBAL_START_TIME).toISOString()
    );
  });
})();

export { GLOBAL_START_TIME };
