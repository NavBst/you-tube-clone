import Channel from "../models/Channel.model.js";
import User from "../models/User.model.js";
import Video from "../models/Video.model.js";
import { createError } from "../utils/error.js";

export const createChannel = async (req, res, next) => {
  try {
    const { name, handle, description, avatar } = req.body;
    const {userId} = req.user

    // Check if handle already exists (case insensitive)
    const existingHandle = await Channel.findOne({
      handle: { $regex: new RegExp(`^${handle}$`, "i") },
    });
    if (existingHandle) {
      return next(createError(400, "Channel handle already exists"));
    }

    // Check if user already has a channel
    const existingChannel = await Channel.findOne({ userId });
    if (existingChannel) {
      return next(createError(400, "User already has a channel"));
    }

    // Ensure handle starts with @
    const formattedHandle = handle.startsWith("@") ? handle : `@${handle}`;

    const newChannel = new Channel({
      userId,
      name,
      handle: formattedHandle,
      description,
      avatar: avatar || undefined,
    });

    const savedChannel = await newChannel.save();

    // Update user's channels array
    await User.findByIdAndUpdate(userId, {
      $push: { channels: savedChannel._id },
    });

    res.status(201).json(savedChannel);
  } catch (err) {
    next(err);
  }
};

export const getChannel = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const channel = await Channel.findOne({ userId }).populate(
      "userId",
      "username email avatar"
    );

    console.log(channel)
    if (!channel) {
      return res.status(404).json({ hasChannel: false });
    }

    // Get channel's videos count
    const videosCount = await Video.countDocuments({ channel: channel._id });
   console.log(videosCount)
    const channelData = {
      ...channel.toJSON(),
      videos: videosCount,
    };

    res.status(200).json({ hasChannel: true, channel: channelData });
  } catch (err) {
    next(err);
  }
};

export const getChannelByHandle = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)

    const channel = await Channel.findOne({ _id: id})

    if (!channel) {
      return next(createError(404, "Channel not found"));
    }

    // Get channel's video

    res.status(200).json(channel);
  } catch (err) {
    next(err);
  }
};
