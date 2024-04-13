import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    postId:{ type: String, required: true, unique: true},
    title: { type: String, required: true },
    content: {type: String, required: true},
    authorId: {type: String, required: true},
    publishDate: {type: Date, required: true},
    lastUpdated:{type: Date, required: true},
    category: {type: String, required: true},
    featuredImage:{type: String, required: true}
});

export default mongoose.model('Blog', blogSchema);

