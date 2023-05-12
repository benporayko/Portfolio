// import app from "./server.js";
const app = require("./server.js");
const mongodb = require('mongodb');
// import mongodb from "mongodb";
const dotenv = require('dotenv');
// import dotenv from "dotenv";
const mongoose = require('mongoose');
// import mongoose from "mongoose";

dotenv.config()
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

// Connection to the database and starts up the server
async function connectToDatabase() {
    try {
        await mongoose.connect(
            process.env.PORTFOLIO_DB_URI,
            {
                maxPoolSize: 50,
                wtimeoutMS: 2500,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(async client => {
            app.listen(port, () => {
                console.log(`listening on port ${port}`);
            })
        })
    } catch (err) {
        console.error(err.stack);
        process.exit(1);
    }
    
}

app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});

connectToDatabase();
