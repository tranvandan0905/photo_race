const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
const advertiserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company_name: String,
  website: String,
  created_at: { type: Date, default: Date.now }
});
advertiserSchema.plugin(mongoose_delete, {
  overrideMethods: "all",
  deletedAt: true,
  deletedBy: true
});
module.exports = mongoose.model("Advertiser", advertiserSchema);
