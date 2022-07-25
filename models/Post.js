const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    challenge: {
        type: Schema.Types.ObjectId,
        ref: 'challenges'
    },
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'update'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);