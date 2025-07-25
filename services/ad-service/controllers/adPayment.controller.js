const { handleCreateadpayment,handlePaymentByIDADS, handlegetadpayment } = require("../services/adPayment.services");
const PostAdpayment = async (req, res) => {
  try {
    const ad = await handleCreateadpayment(req.body);
    res.status(200).json({ data: ad, message: "Thanh toán thành công!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Có lỗi xảy ra!" });
  }
};
const getAdpayment = async (req, res) => {
  try {
    const ad = await handlegetadpayment();
    res.status(200).json({ data: ad, message: "lấy thành công!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Có lỗi xảy ra!" });
  }
};
const PaymentByIDADS = async (req, res) => {
  try {
    const ad_id=req.params.id;
    const ad = await handlePaymentByIDADS(ad_id);
    res.status(200).json({ data: ad || [], message: "Lấy thành công!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Có lỗi xảy ra!" });
  }
};
module.exports = {
 PostAdpayment,
 PaymentByIDADS,getAdpayment
};