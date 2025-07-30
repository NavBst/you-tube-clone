import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
  channeId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
  },
  description: {
    type: String,
    default: "",
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  videos: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Channel = mongoose.model("channel", ChannelSchema);
export default Channel;
