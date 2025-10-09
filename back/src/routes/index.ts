import express from "express";
import { VideoController } from "../controllers/videoController.js";

export const router = express.Router();

const videoController = new VideoController();

//GET /videos/
router.get("/videos", videoController.index);
//GET /videos/:id
router.get("/videos/:id", videoController.show);
// POST /videos/
router.post("/videos/store", videoController.create);
// POST /videos/start
router.post("/videos/start", videoController.initializeUpload);
