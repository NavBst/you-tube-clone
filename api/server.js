import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import videoRoutes from "./src/routes/Video.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import channelRoutes from "./src/routes/channel.routes.js";
import { handleError } from "./src/utils/error.js";

const app = express();
dotenv.config();

// Connect to MongoDB with error handling
mongoose.connect(process.env.DB_CONNECTION)
.then(() => console.log("DB connected Successfully!"))
.catch(err => console.error("DB Connection Error:", err));

// Global Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080', // Your frontend URL
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], // Important!
    exposedHeaders: ['Authorization']
}));

// Error handling for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next();
});

// API Routes
app.use('/api/videos', videoRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/user', userRoutes);

// Error Handling Middleware
app.use(handleError);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
