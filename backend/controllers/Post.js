import path from 'path'
import fs from 'fs'
import postModel from '../models/Post.js';
import deleteFile from '../utils/DeleteFile.js'

// Function for add post in db
const addPostHandler = async (req, res, next) => {
    try
    {
        const { _id } = req.user
        const { title, description } = req.body;
        const filePath = req.file.path
        const postObj = {
            title,
            description,
            postImg : filePath,
            userId : _id
        }

        const post = await postModel.create(postObj)

        res.status(200).json({
            success : true,
            message : "Post saved successfully",
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}


// Function to get all posts
const getAllPosts = async (req, res, next) => {
    try
    {
        const page = parseInt(req.query.page) || 1
        const limit = 3
        const skip = (page - 1) * limit
        const posts = await postModel.find()
        .sort({_id : 1})
        .skip(skip)
        .limit(limit)

        const allPosts = await postModel.countDocuments()

        const totalPages = Math.ceil(allPosts / limit)

        res.status(200).json({
            success : true,
            posts,
            currentPage : page,
            totalPages,
            allPosts
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}


// Function to delete post
const deletePost = async (req, res, next) => {
    try
    {
        const { id } = req.params

        let post = await postModel.findById(id)

        if(!post)
        {
                return res.status(404).json({
                    success : false,
                    message : "Post Not Found",
                })
        }

        // delete file
        deleteFile(post.postImg)

        await post.deleteOne()

        res.status(200).json({
            success : true,
            message : "Post Deleted successfully",
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

// Function to get post for update
const showPostForUpdate = async (req, res, next) => {
    try
    {
        const { id } = req.params

        let post = await postModel.findById(id)

        if(!post)
        {
            return res.status(404).json({
                    success : false,
                    message : "Post Not Found",
                })
        }

        res.status(200).json({
            success : true,
            post
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

// Function to update post
const updatePostHandler = async (req, res, next) => {
    try {
        const filePath = req.file?.path
        const { title, description, id, imgPath } = req.body

        // Check if the post exists
        const isPost = await postModel.findById(id)
        if (!isPost) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found",
            });
        }

        // Set the updated fields
        isPost.title = title
        isPost.description = description

        if (filePath) {
            isPost.postImg = filePath

            // Only delete the old file if `imgPath` exists
            if (imgPath) {
                deleteFile(imgPath)
            }
        }

        // Save the updated post
        await isPost.save()

        res.status(200).json({
            success: true,
            message: "Post Updated Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Function to get all posts for blog page
const getAllPostsForBlog = async (req, res, next) => {
    try
    {
        const page = parseInt(req.query.page) || 1
        const limit = 8
        const skip = (page - 1) * limit
        const posts = await postModel.find()
        .sort({_id : -1})
        .skip(skip)
        .limit(limit)

        const allPosts = await postModel.countDocuments()

        const totalPages = Math.ceil(allPosts / limit)

        res.status(200).json({
            success : true,
            posts,
            currentPage : page,
            totalPages,
            allPosts
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

// Function to search post
const searchPosts = async (req, res, next) => {
    try
    {
        const { search } = req.query
        // Define a case-insensitive search in both `title` and `description` fields
        const searchResults = await postModel.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        });

        res.status(200).json({
            count: searchResults.length,
            data: searchResults
        });
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}



// Function to get clicked post
const clickedPostHandler = async (req, res, next) => {
    try
    {
        const { id } = req.params

        const post = await postModel.find({_id : id})

        if(!post)
        {
            return res.status(404).json({
                    success : false,
                    message : "Post not found"
                });
        }

        res.status(200).json({
            success : true,
            post
        });
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

export { addPostHandler, getAllPosts, deletePost, getAllPostsForBlog, searchPosts, clickedPostHandler, showPostForUpdate, updatePostHandler }