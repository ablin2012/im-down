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

}, {
    timestamps: true

});

PostSchema.index({ user: 1, challenge: 1, type: "complete" },{ unique: true, dropDups: true });

module.exports = Post = mongoose.model('Post', PostSchema);