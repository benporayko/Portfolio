// import mongoose from "mongoose";
// const { Schema } = mongoose;
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

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

// export default User;
module.exports = User;