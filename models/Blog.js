import mongoose from "mongoose";

const Schema = mongoose.Schema;


const BlogPost = new Schema({
    author: String,
    title: String,
    body: String,
    image: String,
    createdAt: Date
});

export default mongoose.model('posts', BlogPost)