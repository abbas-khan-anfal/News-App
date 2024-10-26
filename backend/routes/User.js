import express from "express"
import { addUserHandler, getUser, loginUserHandler, getAllUsers, logoutUserHandler, deleteUser, showUserForUpdate, updateUserHandler } from "../controllers/User.js"
import { userUpload } from '../config/Multer.js'
import isAuthenticated from "../middlewares/Auth.js"
// create Router for user routes
const userRouter = express.Router()

// Route for adding user in db
userRouter.post("/adduser", userUpload.single('userImg'), addUserHandler )

// Route for login user
userRouter.post("/login", loginUserHandler )

// Route for logout user
userRouter.get("/logout", logoutUserHandler )

// Route for login user
userRouter.get("/in", isAuthenticated, getUser )

// Route for gettings all users
userRouter.get("/allusers", isAuthenticated, getAllUsers )

// Route for deleting user
userRouter.delete("/deleteuser/:id", deleteUser )

// Route for show user for update
userRouter.get("/showuserforupdate/:id", showUserForUpdate )

// Route for updating user
userRouter.put("/updateuser", userUpload.single("userImg"), updateUserHandler )

export default userRouter