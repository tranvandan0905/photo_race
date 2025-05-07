const axios = require('axios');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let response;
    try {
      response = await axios.post('http://auth-service:3008/api/auth/login', {
        email,
        password
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Không thể kết nối đến auth-service!";
      throw new Error(message);
    }

    // Trả kết quả nếu thành công
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      token: response.data.token
    });

  } catch (error) {
    // Trả lỗi nếu có exception
    return res.status(401).json({
      message: "Đăng nhập thất bại!",
      error: error.message
    });
  }
};

module.exports = { login };
