const axios = require('axios');
const getuser = async (req, res) => {
  try {
    const response = await axios.get('http://user-service:3003/api/user');
    res.json({
      data: response.data
    });
  } catch (error) {
    return res.status(400).json({
      errorCode: 1,
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};
const findUser = async (req, res) => {
  try {
    const { name } = req.query;

    const response = await axios.get("http://user-service:3003/api/user/find", {
      params: { name }
    });

    return res.status(200).json({
      errorCode: 0,
      data: response.data
    });

  } catch (err) {
    return res.status(400).json({
      errorCode: 1,
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};
const getopic = async (req, res) => {
  try {
    const response = await axios.get('http://topic-service:3004/api/topic');
    res.json({
      data: response.data
    });
  } catch (error) {
    return res.status(400).json({
      errorCode: 1,
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};
const postsubmission = async (req, res) => {
  try {
    const data = req.body;
    const submission = await axios.post("http://submission-service:3005/api/submission", data, {
      headers: {
        "x-user-id": req.user?.id,
      }
    });

    return res.status(200).json({
      data: submission.data
    });

  } catch (error) {
    return res.status(400).json({
      errorCode: 1,
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};
const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const response = await axios.post('http://auth-service:3008/api/auth/login', {
      name,
      password
    });

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token: response.data.token
    });

  } catch (error) {
    return res.status(401).json({
      message: "Đăng nhập thất bại!",
      error: error.response?.data?.message || error.message
    });
  }
};


module.exports = { getuser, getopic, findUser, postsubmission,login };