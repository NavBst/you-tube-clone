import { createVideo, fetchVideos } from "../controllers/video.controller.js";
import { verifyToken } from "../middlewares/authUser.js";

export function videoRoutes(app, router) {
  router.post("/video/add",verifyToken, createVideo);
  router.get("/videos",  fetchVideos);
  app.use("/api/", router);
}
