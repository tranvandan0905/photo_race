// models/Ad.js
const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  advertiser_id: { type: mongoose.Schema.Types.ObjectId, ref: "Advertiser" },
  title: String,
  content: String,
  image_url: String,
  target_url: String,
  price_per_click: Number,
  max_clicks: Number,
  remaining_clicks: Number,
  status: { type: String, enum: ["pending", "active", "expired", "rejected"], default: "pending" },
  price_per_click: Number, 
  total_clicks: { type: Number, default: 0 },  
  total_cost: { type: Number, default: 0 },    
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ad", adSchema);
