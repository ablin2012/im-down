const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    default: new Date(Date.now() + (24 * 60 * 60 * 1000))
  },
  startDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = Tweet = mongoose.model('Challenge', ChallengeSchema);