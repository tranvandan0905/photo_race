const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  submission_id: {
    type: String,
    required: true
  },
  liked_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Like', likeSchema);
