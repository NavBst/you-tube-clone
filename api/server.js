import express, { json } from "express";
import mongoose from "mongoose";
import { videoRoutes } from "./src/routes/Video.routes.js";
import { userRoute } from "./src/routes/user.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import { commentRoutes } from "./src/routes/comment.routes.js";

const app = express();
const router = express.Router();
dotenv.config();
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("DB connected Succesfull! ");
});
app.use(express.json());
app.use(cors());

videoRoutes(app, router);
userRoute(app, router);
commentRoutes(app, router);

app.listen(process.env.PORT, (resolve, reject) => {
  console.log(`running in port ${process.env.PORT}`);
});
