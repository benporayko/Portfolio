import mongoose from "mongoose";
const { Schema } = mongoose;
// const mongoose = require('mongoose');
// const Schema = require('mongoose');

const blogpost = new Schema({
    title: String,
    subtitle: String,
    published: Boolean,
    body: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    author: String,
    publicUrl: {
        type: String,
        required: true
    }
});

const BlogPost = mongoose.model('BlogPost', blogpost);

export default BlogPost;