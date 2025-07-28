import { addComment } from "../controllers/comment.controller.js";


export function commentRoutes(app, router) {
  router.post("/comment", addComment);
//   router.get("/comments",  );
  app.use("/api/video", router);
}
