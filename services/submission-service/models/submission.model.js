const mongoose = require('mongoose');
const submissionSchema = new mongoose.Schema({
  user_id: {
        type: String,
        required: true
      },
  topic_id: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  submitted_at: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Submission', submissionSchema);
