// // import express from "express";
// const express = require('express');
// const BlogPostsCtrl = require("./blogposts.controller.js");
// // import BlogPostsCtrl from "./blogposts.controller.js";
// const multer = require('multer');
// // import multer from "multer";
// const UsersCtrl = require("./users.controller.js");
// // import UsersCtrl from "./users.controller.js";
// const { verifyJWT } = require("../services/JWTservice.js");
// // import { verifyJWT } from "../services/JWTservice.js";

// const router = express.Router();
// const authenticatedRoutes = express.Router();
// authenticatedRoutes.use(verifyJWT);

// const storage = multer.memoryStorage();
// const upload = multer({dest: 'uploads/'});

// router.route("/").get(BlogPostsCtrl.apiGetBlogPosts);
// router.route("/id/:id").get(BlogPostsCtrl.apiGetBlogPostsById);

// authenticatedRoutes.put("/edit", upload.single('file'), async (req, res, next) => {
//     try {
//         res.setHeader('Cache-Control', 'no-store');
//         await BlogPostsCtrl.apiUpdateBlogPost(req, res, next);
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: 'Internal Server Error'});
//     }
// })
// .post("/edit", upload.single('file'), async (req, res, next) => {
//     try {
//         res.setHeader('Cache-Control', 'no-store');
//         await BlogPostsCtrl.apiCreateNewPost(req, res, next);
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: 'Internal Server Error'});
//     }
// })
// .post("/deletePost", upload.none(), async (req, res, next) => {
//     try {
//         res.setHeader('Cache-Control', 'no-store');
//         await BlogPostsCtrl.apiDeleteBlogPost(req, res, next);
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({ error: 'Internal Server Error'});
//     }
// })

// router.route("/register").post(UsersCtrl.apiRegisterUser);
// router.route("/login").post(upload.none(), UsersCtrl.apiLoginUser);

// // verifyJWT is used for any route that needs to be protected. called before rest of function arguments
// router.get("/isUserAuth", verifyJWT, (req, res) => {
//     return res.json({isLoggedIn: true, username: req.user.username, role: req.user.role});
// })

// router.use(authenticatedRoutes);

// module.exports = router;