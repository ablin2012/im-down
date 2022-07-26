const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String, 
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    imageUrl: { type: String }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);