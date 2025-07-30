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
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channel',
        required: true
    },
    channelName: {
        type: String,
        required: true
    },
    category: {
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
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
}
)

const video = mongoose.model("video", videoSchema)
export default video;