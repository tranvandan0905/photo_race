const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  submission_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  commented_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
