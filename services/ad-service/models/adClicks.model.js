
const mongoose = require("mongoose");
const adClickSchema = new mongoose.Schema({
  ad_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ad" },        
}
);

module.exports = mongoose.model("AdClick", adClickSchema);
