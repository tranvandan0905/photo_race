const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topRankingSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  submission_id: {
    type: String,
    required: true
  },

  total_score: {
    type: Number,
    required: true
  },
    topic_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('TopRanking', topRankingSchema);
