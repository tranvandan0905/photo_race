const axios = require('axios');
const FormData = require('form-data');
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
    const title = req.body.title;
    const user_id = req.user.id;
    const image = req.file;
    if (!title) {
      throw new Error("Vui lòng điền đầy đủ thông tin!");
    }
    if (!image) {
      throw new Error("Không có ảnh nào được gửi.");
    }
    if (!user_id) {
      throw new Error("Lấy ID không thành công.");
    }
    const votetopic = await axios.get(`http://interaction-service:3006/api/interaction/votetopic/findvote/${user_id}`);
    if (!votetopic) {
      const err = votetopic.data.message;
      throw new Error(err);
    }
    const topic_id = votetopic.data.data._id;
    const form = new FormData();
    form.append("file", image.buffer, { filename: image.originalname, contentType: image.mimetype });

    const headers = form.getHeaders();

    const response = await axios.post(
      'http://media-service:5000/api/media/upload',
      form,
      { headers: headers }
    );

    const imageUrl = response.data?.data?.secure_url;
    if (!imageUrl) {
      throw new Error("Lấy ảnh thất bại!");
    }

    const submission = await axios.post(
      "http://submission-service:3005/api/submission",
      { user_id, topic_id, title, imageUrl }
    );

    return res.status(200).json({
      errorCode: 0,
      data: submission.data,
    });

  } catch (error) {
    return res.status(400).json({
      errorCode: 1,
      message: error?.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
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

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      token: response.data.token
    });

  } catch (error) {
    return res.status(401).json({
      message: "Đăng nhập thất bại!",
      error: message.message
    });
  }
};


module.exports = { getuser, getopic, findUser, postsubmission, login };