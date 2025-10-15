import express from "express";
import { VideoController } from "../controllers/videoController.js";
import YoutubeClient from "../utils/youtubeClient.js";

export const router = express.Router();

const videoController = new VideoController();

//GET /videos/
router.get("/videos", videoController.index);
// POST /videos/start
router.post("/videos/start", videoController.initializeUpload);
// POST /videos/verify
router.post("/videos/verify", videoController.verifyUploadStatus);
//GET /videos/:id
router.get("/videos/:id", videoController.show);
