const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipationSchema = new Schema({
  participant: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  challenge: {
    type: Schema.Types.ObjectId,
    ref: 'challenges'
  }
}, {
  timestamps: true
});

module.exports = Participation = mongoose.model('Participation', ParticipationSchema);