const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  advertiser_id: { type: mongoose.Schema.Types.ObjectId, ref: "Advertiser", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image_url: { type: String, required: true },
  target_url: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "active", "completed", "rejected"],
    default: "pending"
  },

  created_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Ad", adSchema);
