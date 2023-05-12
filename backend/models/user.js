import mongoose, { Schema } from "mongoose";
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

const user = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', user);

export default User;