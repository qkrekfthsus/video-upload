const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    content: {
        type: String
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    

}, {timestamps: true});



const Comment = mongoose.model('Comment', commentSchema);
module.exports = {Comment};