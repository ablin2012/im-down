const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendshipRequestSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

FriendshipRequestSchema.index({ requester: 1, receiver: 1 },{ unique: true, dropDups: true });

module.exports = FriendshipRequest = mongoose.model('FriendshipRequest', FriendshipRequestSchema);