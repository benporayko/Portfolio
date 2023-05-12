// import BlogPostsDAO from "../dao/blogpostsDAO.js";
const BlogPostsDAO = require("../dao/blogpostsDAO.js");
// import dotenv from "dotenv";
const dotenv = require('dotenv');
// import fs from "node:fs";
const fs = require('node:fs');
const { Storage } = require('@google-cloud/storage');
// import { Storage }  from "@google-cloud/storage"

dotenv.config()
// changing this for production
// const credentials = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS));
const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const storage = new Storage({
    projectId: credentials.project_id,
    credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key
    }
});

const BUCKET_NAME = 'ben-porayko';

class BlogPostsCtrl {

    static async apiGetBlogPosts(req, res, next) {
        const blogPostList = await BlogPostsDAO.getBlogPosts();

        let response = {
            blog_posts: blogPostList
        }
        res.json(response);
    }
    static async apiGetBlogPostsById(req, res, next) {
        try {
            let blogPost = await BlogPostsDAO.getBlogPostById(req.params.id);
            if (!blogPost) {
                res.status(404).json({ error: "Not found"});
                return;
            }
            res.json(blogPost);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiCreateNewPost(req, res, next) {
        console.log(req.file);
        if (req.user.role == 'admin') {
            try {
                const title = req.body.title;
                const subtitle = req.body.subtitle;
                const body = req.body.body;
                const published = req.body.published;
                const tags = req.body.tags;
                const author = req.body.author;
    
                const file = req.file;
                
                // destination specifies the folder in google cloud storage to upload the files to
                const fileOptions = {
                    destination: "images/hero-images/" + req.file.originalname,
                    filename: req.file.originalname,
                    metadata: {
                        contentType: file.mimetype
                    }
                }
    
                // uploads the file to google cloud storage, then returns the publicUrl to be stored in the database
                const [uploadedFile] = await storage.bucket(BUCKET_NAME).upload(file.path, fileOptions);
                const publicUrl = uploadedFile.publicUrl();
    
                await BlogPostsDAO.postNewBlogPost(title, subtitle, published, body, tags, author, publicUrl);
                
                // deletes the file from the temporary uploads folder on the server
                fs.unlinkSync(file.path);
    
                res.json({ status: "success"});
    
            } catch (e) {
                res.status(500).json({error: e.message});
            }
        } else {
            console.log("Must be logged in as an admin to create posts!");
            res.json({message: 'Must be logged in as an admin to create posts!'});
        }
        
    }

    static async apiDeleteBlogPost(req, res, next) {
        if (req.user.role == 'admin') {
            try {
                const id = req.body.id;
                // gets publicUrl, then uses the delete method of the bucket object to delete the image from google cloud storage
                const blogPost = await BlogPostsDAO.getBlogPostById(id);
                const publicUrl = blogPost[0].publicUrl;
                // decodeURIComponent returns the URL in the proper format
                const fileName = decodeURIComponent(publicUrl).substring(decodeURIComponent(publicUrl).lastIndexOf('/') + 1);
                const bucket = storage.bucket(BUCKET_NAME);
                await bucket.file(`images/hero-images/${fileName}`).delete();
                await BlogPostsDAO.deleteBlogPostById(id);
                res.json({status: "success"});
            } catch (e) {
                res.status(500).json({error: e.message});
            }
        } else {
            console.log("Must be logged in as an admin to delete posts!");
            res.json({message: 'Must be logged in as an admin to delete posts!'});
        }
    }

    static apiUpdateBlogPost = async(req, res, next) => {
        if (req.user.role == "admin") {
            try {
                const id = req.body.id;
                let publicUrl = "";
                // see if image needs to be updated
                const tempBlogPost = await BlogPostsDAO.getBlogPostById(id);
                if (req.file != undefined) {
                    console.log("there is an image");
    
                    const file = req.file;
                
                    // destination specifies the folder in google cloud storage to upload the files to
                    const fileOptions = {
                        destination: "images/hero-images/" + req.file.originalname,
                        filename: req.file.originalname,
                        metadata: {
                            contentType: file.mimetype
                        }
                    }
    
                    // uploads the file to google cloud storage, then returns the publicUrl to be stored in the database
                    const [uploadedFile] = await storage.bucket(BUCKET_NAME).upload(file.path, fileOptions);
                    publicUrl = uploadedFile.publicUrl();
    
                    // deletes the file from the temporary uploads folder on the server
                     fs.unlinkSync(file.path);
    
                    // delete the old image from GCS
    
                    const tempPublicUrl = tempBlogPost[0].publicUrl;
                    // decodeURIComponent returns the URL in the proper format
                    const fileName = decodeURIComponent(tempPublicUrl).substring(decodeURIComponent(tempPublicUrl).lastIndexOf('/') + 1);
                    console.log(decodeURIComponent(tempPublicUrl).substring(decodeURIComponent(tempPublicUrl).lastIndexOf('/') + 1));
                    const bucket = storage.bucket(BUCKET_NAME);
                    await bucket.file(`images/hero-images/${fileName}`).delete();
    
                } else {
                    publicUrl = tempBlogPost[0].publicUrl;
                }
    
                //see if there was an image uploaded
                // if not, keep previous image publicUrl
                // if yes, delete the image from GCS and upload new image
                // update publicUrl
    
                const title = req.body.title;
                const subtitle = req.body.subtitle;
                const body = req.body.body;
                const published = req.body.published;
                const tags = req.body.tags;
                const author = req.body.author;
                // const publicUrl = req.body.publicUrl;
    
                await BlogPostsDAO.updateBlogPost(id, title, subtitle, published, body, tags, author, publicUrl);
                res.json({status: "success"});
            } catch (e) {
                res.status(500).json({error: e.message});
            }
        } else {
            console.log("Must be logged in as an admin to edit posts!");
            res.json({message: 'Must be logged in as an admin to edit posts!'});
        }
    }
}

module.exports = BlogPostsCtrl;