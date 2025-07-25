const { default: mongoose } = require("mongoose");


const AdsDepositRequestSchema = mongoose.Schema({
  ad_id:{
    type: String,
    required: true
  }, 
  advertiser_id:{
    type: String,
    required: true
  },
  amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("AdsDepositRequest", AdsDepositRequestSchema);
