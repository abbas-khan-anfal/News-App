import express, { urlencoded } from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/MongoDB.js'
import userRouter from './routes/User.js'
import postRouter from './routes/Post.js'
import userModel from './models/User.js'
import postModel from './models/Post.js'
import messageModel from './models/Message.js';

// app config
const app = express()
connectDB()

// Serve static files
app.use('/uploads', express.static('uploads'));


//middlewares
app.use(express.json())
app.use(urlencoded({ extended : true }))
app.use(cookieParser())
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ['GET', 'POST', 'DELETE', 'PUT'],
    credentials : true
}))



// endpoint for users
app.use('/user', userRouter)

// endpoint for posts
app.use('/post', postRouter)

// get total users and posts
app.get('/all', async (req, res, next) => {
    try
    {
      
      // const totalPosts = await postModel.find().countDocuments()
      // const totalUsers = await userModel.find().countDocuments()

      // Run both queries in parallel using Promise.all // suggested
      const [totalPosts, totalUsers] = await Promise.all([
        postModel.countDocuments(),
        userModel.countDocuments()
      ]);

        res.status(200).json({
            success : true,
            totalPosts,
            totalUsers
        })
    }
    catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
})


// get total users and posts
app.post('/usermessage', async (req, res, next) => {
  try
  {
    const { email, message } = req.body

    const userMessage = await messageModel.create({email, message})

      res.status(200).json({
          success : true,
          message : "Message Sent Successfully",
          userMessage
      })
  }
  catch(error)
  {
      res.status(500).json({
          success : false,
          message : error.message,
      })
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(process.env.PORT, () => {
  console.log(`Server Listening on Port ${process.env.PORT} In Development Mode`)
})