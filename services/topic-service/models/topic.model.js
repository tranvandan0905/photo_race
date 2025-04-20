
const mongoose = require('mongoose');
const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  start_time: {
    type: Date,
    default: null
  },
  end_time: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Topic', topicSchema);
