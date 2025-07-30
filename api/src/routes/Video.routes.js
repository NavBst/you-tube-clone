import express from "express";
import { verifyToken } from "../middlewares/authUser.js";
import { createVideo, fetchVideos } from "../controllers/video.controller.js";

const router = express.Router();

// Create video (protected, needs token and channel)
router.post("/", verifyToken, createVideo);

// Get all videos (public)
router.get("/", fetchVideos);

// Get single video by id (public)
// router.get("/:id", getVideoById);

export default router;
