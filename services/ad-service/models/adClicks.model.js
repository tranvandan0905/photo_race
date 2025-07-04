
const mongoose = require("mongoose");
const adClickSchema = new mongoose.Schema({
  ad_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ad" },        
  user_agent: String,        
  clicked_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AdClick", adClickSchema);
