import mongoose from "mongoose";

const ChannelSchema = mongoose.Schema();

const UserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    required: false,
  },
  channels: {
    type: [],
    default: [],
  },
});

const User = mongoose.model("user", UserSchema);
export default User;
