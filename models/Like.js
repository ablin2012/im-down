const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  }
}, {
  timestamps: true
});

LikeSchema.index({ user: 1, post: 1 },{ unique: true, dropDups: true });

module.exports = Like = mongoose.model('Like', LikeSchema);