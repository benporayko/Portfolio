import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BlogPost from "./models/blogpost.js";
import User from "./models/user.js";
import BlogPostsDAO from "./dao/blogpostsDAO.js";

dotenv.config()
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

// Connection to the database and starts up the server
await mongoose.connect(
    process.env.PORTFOLIO_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewURlParser: true
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
})