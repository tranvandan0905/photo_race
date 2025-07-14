const axios = require('axios');
const bankingMoMo = async (req, res) => {
  try {

    const { xu } = req.body;
    const user_id = req.user.id;

    if (!xu || !user_id) {
      return res.status(400).json({ message: "Thiếu thông tin xu hoặc người dùng!" });
    }

    const data = {xu, user_id };
    const response = await axios.post("http://banking-service:3010/api/banking/momo", data);

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi Banking Service!",
    });
  }
};

const getdepositRequet = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = await axios.get(`http://banking-service:3010/api/banking/depositrequest/${user_id}`)
    return res.status(200).json({
      data: data.data
    })
  } catch (error) {
    return res.status(500).json({
      message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
}
const gettwithdrawRequet = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = await axios.get(`http://banking-service:3010/api/banking/withdrawrequest/${user_id}`)
    return res.status(200).json({
      data: data.data
    })
  } catch (error) {
    return res.status(500).json({
      message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
}
const bankingMoMoAds = async (req, res) => {
  try {

    const advertiser_id = req.ads.id;
    const { title, content, image_url, target_url, start_date, end_date } = req.body;

    if (!title || !content || !image_url || !target_url || !start_date || !end_date || !advertiser_id) {
      return res.status(400).json({ message: "Thiếu thông tin quảng cáo!" });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const price_per_day = 200000;
    const amount = days * price_per_day;

    const data = {
      title,
      content,
      image_url,
      target_url,
      start_date,
      end_date,
      advertiser_id,

    };
    let ads;
    try {

      ads = await axios.post(`http://ad-service:3009/api/ad/ads`, data);
    } catch (error) {
      return res.status(500).json({
        message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
      });
    }
    const ad_id = ads.data?.data?._id;
    const newdata = {
      advertiser_id,
      ad_id: ad_id,
      amount,
      price_per_day
    }
    const response = await axios.post("http://banking-service:3010/api/banking/momoAds", newdata);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi Banking Service!",
    });
  }
};


module.exports = { bankingMoMo, getdepositRequet, gettwithdrawRequet, bankingMoMoAds };