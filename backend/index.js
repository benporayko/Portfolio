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
/* 
    Handles MIME type mismatch
*/
app.get('*.js', function(req, res, next) {
    res.set('Content-Type', 'application/javascript');
    next();
  });

app.get('*.css', function(req, res, next) {
    res.set('Content-Type', 'text/css');
    next();
});

/*
    Serves index.html
*/
app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "..", "frontend", "build", "index.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send("File not found");
        }
    })
});

/*
    Serves JS build files
*/

app.get("/static/js/*", (req, res) => {
    let x = req.url.lastIndexOf('/');
    let result = req.url.substring(x + 1);
    res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "static", "js", result));
    console.log("Route handler for js files executed")
})

/*
    Serves CSS build files
*/

app.get("/static/css/*", (req, res) => {
    let x = req.url.lastIndexOf('/');
    let result = req.url.substring(x + 1);
    res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "static", "css", result));
    console.log("Route handler for css files executed")
})

/*
    Serves media build files (etc. Bootstrap icons)
*/

app.get("/static/media/*", (req, res) => {
    let x = req.url.lastIndexOf('/');
    let result = req.url.substring(x + 1);
    res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "static", "media", result));
    console.log("Route handler for media files executed")
})

/*
    Routes any other URLs back to index.html (Allows React routing to work)
*/

app.get("*", (req, res) => {
    const filePath = path.resolve(__dirname, "..", "frontend", "build", "index.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send("File not found");
        }
    })
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
