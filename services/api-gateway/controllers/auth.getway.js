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
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const response = await axios.post('http://user-service:3003/api/user/email-confirm', {
      email,
      name,
      password
    });

    return res.status(200).json({
      message: response.data.message,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
    });
  }
};
const loginAds = async (req, res) => {
    try {
      const { email, password } = req.body;
      let response;
      response = await axios.post('http://auth-service:3008/api/auth/loginAds', {
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
const registerAds = async (req, res) => {
  try {
    const response = await axios.post('http://ad-service:3009/api/ad/advertisers',req.body);
    return res.status(200).json({
      message: response.data.message,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
    });
  }
};
module.exports = { login,register,loginAds ,registerAds};
