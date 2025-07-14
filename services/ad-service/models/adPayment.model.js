
const mongoose = require("mongoose");
const AdPaymentSchema = new mongoose.Schema({
    ad_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
    advertiser_id: { type: mongoose.Schema.Types.ObjectId, ref: "Advertiser", required: true },
    amount: { type: Number, required: true },
    price_per_day: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    paid_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("adPayment", AdPaymentSchema);
