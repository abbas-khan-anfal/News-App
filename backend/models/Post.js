import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    postImg : {type : String, required : true},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
})

const postModel = mongoose.model.posts || mongoose.model('posts', postSchema)

export default postModel