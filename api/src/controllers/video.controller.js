  import Video from "../models/Video.model.js";

  export const createVideo = async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
      const newVideo = await Video.create(data);
      return res.status(201).json(newVideo);
    } catch (er) {
      return res.status(500).json({ error: er });
    }
  };

export const fetchVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    return res.status(200).json(videos);
  } catch (er) {
    return res.status(500).json({ error: er.message });
  }
};

export const deleteVideo = async (req, res) => {};

export const updateVideo = async (req, res) => {};
