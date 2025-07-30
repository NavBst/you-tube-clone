import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { userAuthentication, userRegAuth } from "../middlewares/authUser.js";

const router = express.Router();

router.post("/register", userRegAuth, register);
router.post("/login", userAuthentication, login);

export default router;
