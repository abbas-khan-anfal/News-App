import mongoose from 'mongoose'

const connectDB = async () => {
    try
    {
        mongoose.connect('mongodb://localhost:27017/newsdb')
        console.log('DB Connected Successfully')
    }
    catch(error)
    {
        console.log("Error Connecting DB : ", error)
    }
}

export default connectDB