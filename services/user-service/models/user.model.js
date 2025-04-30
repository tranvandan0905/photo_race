
const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  password_hash: {
    type: String,
    required: true
  },
  xu: {
    type: Number,
    default: 50
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  check_email: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
userSchema.plugin(mongoose_delete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});

module.exports = mongoose.model('User', userSchema);
