import express from "express";
import { VideoController } from "../controllers/videoController.js";
import upload from "../utils/upload.js";

export const router = express.Router();

const videoController = new VideoController();
const multer = upload;

//GET /videos/
router.get("/videos", videoController.index);
//GET /videos/:id
router.get("/videos/:id", videoController.show);
// POST /videos/
router.post("/videos/store", multer.single("video"), videoController.create);
