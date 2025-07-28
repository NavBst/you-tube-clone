import { login, register } from "../controllers/user.controller.js";
import { userAuthentication, userRegAuth } from "../middlewares/authUser.js";

export function userRoute(app, route) {
  route.post("/register", userRegAuth, register);
  route.post("/login", userAuthentication, login);
  app.use("/api/user", route);
}
