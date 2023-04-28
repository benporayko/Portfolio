import mongoose, { Schema } from "mongoose";

const user = new Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', user);

export default User;