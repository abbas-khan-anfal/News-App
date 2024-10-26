import path from 'path'
import userModel from '../models/User.js'
import moment from 'moment'
import bcrypt from 'bcrypt'
import sendCookie from '../utils/Features.js'
import deleteFile from '../utils/DeleteFile.js'

// Function for add user in db
const addUserHandler = async (req, res, next) => {
    try
    {
        const {username, email, password} = req.body
        const imgPath = req.file.path

        // check if user is exist or not
        let user = await userModel.findOne({ email })

        if(user)
        {
            return res.status(401).json({
                success : false,
                message : "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userObj = {
            username,
            email,
            password : hashedPassword,
            createdAt : moment(Date.now()).format('D/M/YYYY'),
            imgPath
        }

        // save data in db
        user = await userModel.create(userObj)

        res.status(200).json({
            success : true,
            message : "User saved successfully",
            user : user
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


// Function for Login user
const loginUserHandler = async (req, res, next) => {
    try
    {
        const {email, password} = req.body

        // check if user is exist or not
        let user = await userModel.findOne({ email })

        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "Invalid Email"
            })
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch)
            {
                return res.status(400).json({
                    success : false,
                    message : "Incorrect Password"
                })
            }

        // login to dashboard
        sendCookie(user, res, "User Loged in Successfully", 200)
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}

// Function to logout user
const logoutUserHandler = (req, res, next) => {
    return res.status(200).cookie('token','',{
        httpOnly: true,
        expires: new Date(0),
    }).json({
        success : true,
        message : "Logout Successfull"
    })
}

// Function to get user
const getUser = (req, res, next) => {
    return res.status(200).json({
        success : true,
        user : req.user
    })
}

// Function to get all users
const getAllUsers = async (req, res, next) => {
    try
    {
        const page = parseInt(req.query.page) || 1
        const limit = 3
        const skip = (page - 1) * limit
        const allUsers = await userModel.find()
        .sort({_id : 1})
        .skip(skip)
        .limit(limit)

        // count total users
        const totalUsers = await userModel.countDocuments()

        // get all pages
        const totalPages = Math.ceil(totalUsers / limit)



        return res.status(200).json({
            success : true,
            allUsers,
            currectPage : page,
            totalPages,
            totalUsers
        })

    }
    catch(error)
    {
        return res.status(500).json({
                success : false,
                message : error.message
            })
    }
}


// Function to delete user
const deleteUser = async (req, res, next) => {
    try
    {
        const { id } = req.params

        let user = await userModel.findById(id)

        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "User Not Found",
            })
        }

        // delete file
        deleteFile(user.imgPath)

        await user.deleteOne()

        res.status(200).json({
            success : true,
            message : "User Deleted successfully",
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

// Function to delete user
const showUserForUpdate = async (req, res, next) => {
    try
    {
        const { id } = req.params

        let user = await userModel.findById(id)

        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "User Not Found",
            })
        }

        res.status(200).json({
            success : true,
            user
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
const updateUserHandler = async (req, res, next) => {
    try {
        const filePath = req.file?.path
        const { username, email, id, imgPath } = req.body

        // Check if the post exists
        const isUser = await userModel.findById(id)
        if (!isUser) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        // Set the updated fields
        isUser.username = username
        isUser.email = email

        if (filePath) {
            isUser.imgPath = filePath

            // Only delete the old file if `imgPath` exists
            if (imgPath) {
                deleteFile(imgPath)
            }
        }

        // Save the updated post
        await isUser.save()

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { addUserHandler, loginUserHandler, getUser, getAllUsers, logoutUserHandler, deleteUser, showUserForUpdate, updateUserHandler }