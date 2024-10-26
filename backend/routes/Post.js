import express from "express"
import { addPostHandler, clickedPostHandler, deletePost, getAllPosts, getAllPostsForBlog, searchPosts, showPostForUpdate, updatePostHandler } from "../controllers/Post.js"
import { postUpload } from '../config/Multer.js'
import isAuthenticated from "../middlewares/Auth.js"
// create Router for post routes
const postRouter = express.Router()

// Route for adding post in db
postRouter.post("/addpost", isAuthenticated, postUpload.single('postImg'), addPostHandler )

// Route for getting all posts
postRouter.get("/getposts", getAllPosts )

// Route for deleting post
postRouter.delete("/deletepost/:id", deletePost )

// Route for show post for updating
postRouter.get("/showpostforupdate/:id", showPostForUpdate )

// Route for update post
postRouter.put("/updatepost/", postUpload.single('postImg'), updatePostHandler )

// Route for getting all posts for blog page
postRouter.get("/getpostsforblog", getAllPostsForBlog )

// Route for searching posts in db
postRouter.get("/search", searchPosts )

// Route for getting clicked post
postRouter.get("/clickedpost/:id", clickedPostHandler )


export default postRouter