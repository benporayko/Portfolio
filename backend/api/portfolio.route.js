import express from "express";
import BlogPostsCtrl from "./blogposts.controller.js";
import multer from "multer";
import UsersCtrl from "./users.controller.js";
import { verifyJWT } from "../services/JWTservice.js";

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

router.route("/register").post(UsersCtrl.apiRegisterUser);
router.route("/login").post(upload.none(), UsersCtrl.apiLoginUser);

// verifyJWT is used for any route that needs to be protected. called before rest of function arguments
router.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({isLoggedIn: true, username: req.user.username});
})

export default router;