import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    email : {type : String, required : true},
    message : {type : String, required : true},
})

const messageModel = mongoose.model.messages || mongoose.model('messages', messageSchema)

export default messageModel