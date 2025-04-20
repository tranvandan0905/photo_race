const mongoose = require('mongoose');

const voteTopicSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  topic_id: {
    type: String,
    required: true
  },
  vote_time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('voteTopic', voteTopicSchema);