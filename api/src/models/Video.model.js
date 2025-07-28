import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        // required: true,
        unique: true,
    },
    videoId: {
        type: String,
        // required: true,
    },
    userId: {
        type: String,
        // required: true,
    },
    text: {
        type: String,
        // required: true,
    },
    timestamp: {
        type: Date,
        // required: true,
        default: () => new Date(),
    },
});



const videoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
    uploader: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    uploadDate: {
        type: Date,
        required: true,
        default: () => new Date(), // returns current time when doc is created
    },
    comments: [commentSchema],
}
)

const video = mongoose.model("video", videoSchema)
export default video;