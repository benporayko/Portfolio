import app from "./server.js";
// const mongodb = require('mongodb');
import mongodb from "mongodb";
// const dotenv = require('dotenv');
import dotenv from "dotenv";
// const mongoose = require('mongoose');
import mongoose from "mongoose";

dotenv.config()
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

// Connection to the database and starts up the server
await mongoose.connect(
    process.env.PORTFOLIO_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewURlParser: true,
        useUnifiedTopology: true
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