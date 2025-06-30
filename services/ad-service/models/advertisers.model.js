const mongoose = require("mongoose");
const advertiserSchema = new mongoose.Schema({
  name: String,               
  email: String,
  phone: String,
  company_name: String,
  website: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("advertiser", advertiserSchema);
