
const mongoose = require("mongoose");
const friendshipSchema = new mongoose.Schema(
  {
      user_id_1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    user_id_2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true 
  }
);

friendshipSchema.index({ user_id_1: 1, user_id_2: 1 }, { unique: true });

module.exports = mongoose.model("Friendship", friendshipSchema);
