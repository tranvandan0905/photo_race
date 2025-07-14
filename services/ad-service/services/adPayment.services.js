const adPayment = require("../models/adPayment.model");

const handleCreateadpayment = async (data) => {
    const { advertiser_id,
        ad_id,
        amount,
        price_per_day } = data;
    if (
        !advertiser_id || !ad_id || !amount || !price_per_day
    ) {
        throw new Error("Vui lòng nhập đầy đủ tất cả các trường bắt buộc.");
    }
    const newAdvertiser = await adPayment.create({
        ad_id,
        advertiser_id,
        amount,
        price_per_day,
        status: "success"
    });

    return newAdvertiser;
};
const handlePaymentByIDADS =async(ad_id)=>{
 return  await adPayment.find({ ad_id }).lean();
}
   
module.exports={handleCreateadpayment,handlePaymentByIDADS};