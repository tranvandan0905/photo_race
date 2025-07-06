const axios = require('axios');

const bankingMoMo = async (req, res) => {
  try {
    const { xu } = req.body;
    const user_id = req.user.id;

    if (!xu || !user_id) {
      return res.status(400).json({ message: "Thiếu thông tin xu hoặc người dùng!" });
    }

    const response = await axios.post('http://banking-service:3010/api/banking/momo', {
      xu,
      user_id
    });

    return res.status(200).json(response.data); 
  } catch (error) {
    return res.status(500).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi Banking Service!"
    });
  }
};
module.exports={bankingMoMo};