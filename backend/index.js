// import app from "./server.js";
const app = require("./server.js");
const mongodb = require('mongodb');
// import mongodb from "mongodb";
const dotenv = require('dotenv');
// import dotenv from "dotenv";
const mongoose = require('mongoose');
// import mongoose from "mongoose";
const express = require('express');
const path = require('path');

dotenv.config()
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "frontend/build")));

// // prevents MIME type mismatch issues
// app.use((req, res, next) => {
//     res.setHeader('X-Content-Type-Options', 'nosniff');
//     next();
//   });
app.get('*.js', function(req, res, next) {
    res.set('Content-Type', 'application/javascript');
    next();
  });

app.get('*.css', function(req, res, next) {
    res.set('Content-Type', 'text/css');
    next();
});
  

app.get("/", (req, res,) => {
    // res.setHeader('X-Content-Type-Options', 'nosniff');
    res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "index.html"));
    console.log('Route handler for "/" is executed');
  });

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

connectToDatabase();
