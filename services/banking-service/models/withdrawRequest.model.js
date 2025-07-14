const mongoose = require("mongoose");

const withdrawRequestSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "success", "contact_support"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WithdrawRequest", withdrawRequestSchema);
