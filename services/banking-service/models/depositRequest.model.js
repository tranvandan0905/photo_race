const mongoose = require("mongoose");

const depositRequestSchema = new mongoose.Schema({
   user_id: {
    type: String,
    required: true
  },
  amount: { type: Number, required: true },
    status: {
    type: String,
    default: "success"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DepositRequest", depositRequestSchema);
