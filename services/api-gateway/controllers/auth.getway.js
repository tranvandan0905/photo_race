const axios = require('axios');

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      let response;
      response = await axios.post('http://auth-service:3008/api/auth/login', {
        email,
        password
      });
      return res.status(200).json({
        message: "Đăng nhập thành công!",
        token: response.data.token
      });
    } catch (error) {
      return res.status(401).json({
        message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
      });
    }
};

module.exports = { login };
