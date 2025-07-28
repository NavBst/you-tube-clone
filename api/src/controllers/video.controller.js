import video from "../models/Video.model.js";

export const createVideo = async (req, res) => {
  const data = req.body;
  try {
    const newVideo = await video.create(data);
    return res.status(201).json(newVideo);
  } catch (er) {
    return res.status(500).json({ error: er.message });
  }
};

export const fetchVideos = async (req, res) => {
  try {
    const videos = await video.find();
    return res.status(200).json(videos);
  } catch (er) {
    return res.status(500).json({ error: er.message });
  }
};

export const deleteVideo = async (req, res) => {};

export const updateVideo = async (req, res) => {};
