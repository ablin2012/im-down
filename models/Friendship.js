const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//friendships populated with user1 < user2 to ensure uniqueness
const FriendshipSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

FriendshipSchema.index({ user1: 1, user2: 1 },{ unique: true, dropDups: true });

module.exports = Friendship = mongoose.model('Friendship', FriendshipSchema);