const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    text: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = Comment = mongoose.model('Comment', CommentSchema);