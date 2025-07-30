import express from "express";
import { verifyToken } from "../middlewares/authUser.js";
import { createChannel, getChannel, getChannelByHandle } from "../controllers/channel.controller.js";

const router = express.Router();

// Create a new channel
router.post("/", verifyToken, createChannel);

// Get user's channel
router.get("/me", verifyToken, getChannel);

// Get channel by handle
router.get("/:handle", getChannelByHandle);

export default router;
