const mongoose = require('mongoose');

const voteSubmissionSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  submission_id: {
    type: String,
    required: true
  },
  vote_time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('VoteSubmission', voteSubmissionSchema);
