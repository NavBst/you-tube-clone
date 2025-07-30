import express from "express";
import { addComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/authUser.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
// router.get("/", getComments);

export default router;
