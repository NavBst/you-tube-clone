import video from "../models/Video.model.js";

export const addComment = async (req, res) => {
  try {
    const { videoId, commentId, userId, text } = req.body;
    console.log(videoId);
    // Build the comment object
    const newComment = {
      commentId, // Should be unique; generate here if not given.
      videoId,
      userId,
      text,
      // timestamp will be auto-filled by schema default
    };
    const newUser = await video.findByIdAndUpdate({ _id: id }, { $push: { comments: newComment } },
      { new: true });

    return res.status(200).json(response);
  } catch (er) {
    return res.status(404).json({ error: er });
  }
};
