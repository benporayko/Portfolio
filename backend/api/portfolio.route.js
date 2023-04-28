import express from "express";
import BlogPostsCtrl from "./blogposts.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({dest: 'uploads/'});

router.route("/").get(BlogPostsCtrl.apiGetBlogPosts);
router.route("/id/:id").get(BlogPostsCtrl.apiGetBlogPostsById);

router
    .route("/edit")
    .post(upload.single('file'), BlogPostsCtrl.apiCreateNewPost)
    // .delete(BlogPostsCtrl.apiDeleteBlogPost)
    .put(upload.single('file'), BlogPostsCtrl.apiUpdateBlogPost);

    // upload.none() allows multipart/form-data to be handled without files
router.route("/deletePost").post(upload.none(), BlogPostsCtrl.apiDeleteBlogPost);

export default router;