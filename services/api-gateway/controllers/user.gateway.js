const axios = require('axios');
const FormData = require('form-data');
const getUser = async (req, res) => {
  try {
    const response = await axios.get('http://user-service:3003/api/user');
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const findUser = async (req, res) => {
  try {
    const { email } = req.query;
    const response = await axios.get("http://user-service:3003/api/user/find", {
      params: { email }
    });
    return res.status(200).json({ data: response.data });
  } catch (err) {
    return res.status(400).json({
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const findNameUser = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get("http://user-service:3003/api/user/find/name", {
      params: { name }
    });
    return res.status(200).json({ data: response.data });
  } catch (err) {
    return res.status(400).json({
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    await axios.delete(`http://user-service:3003/api/user/${user_id}`);
    return res.status(200).json({ message: "Xoá thành công!" });
  } catch (err) {
    return res.status(400).json({
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = req.body;
    const result = await axios.put(`http://user-service:3003/api/user/${user_id}`, data);
    return res.status(200).json({ data: result.data });
  } catch (err) {
    return res.status(400).json({
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const findUserById = async (req, res) => {
  try {
    const user_id = req.query.id || req.user.id;
    const result = await axios.get(`http://user-service:3003/api/user/findID/${user_id}`);
    return res.status(200).json({ data: result.data.data });
  } catch (err) {
    return res.status(400).json({
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};
const updateAvataUser = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const image = req.file;

    if (!user_id) {
      return res.status(400).json({ message: "Không tìm thấy ID người dùng!" });
    }

    if (!image) {
      return res.status(400).json({ message: "Vui lòng chọn ảnh!" });
    }

    // Tạo form-data để gửi sang media-service
    const form = new FormData();
    form.append("file", image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype
    });
    const uploadRes = await axios.post(
      'http://media-service:5000/api/media/upload',
      form,
      { headers: form.getHeaders() }
    );

    const imageUrl = uploadRes.data?.data?.secure_url;

    if (!imageUrl) {
      return res.status(500).json({ message: "Lấy đường dẫn ảnh thất bại!" });
    }

    // Gọi sang user-service để cập nhật ảnh đại diện
    const updateRes = await axios.put(
      `http://user-service:3003/api/user/${user_id}`,
      { imageUrl }
    );

    return res.status(200).json({
      message: "Cập nhật ảnh đại diện thành công!",
      data: updateRes.data
    });

  } catch (error) {
    console.error("Lỗi update avatar:", error.message);
    return res.status(500).json({
      message: error.response?.data?.message || "Đã có lỗi xảy ra!"
    });
  }
};
const patchVoteXu = async (req, res) => {
  try {
    const user_id = req.params.id;
    const result = await axios.patch(`http://user-service:3003/api/user/vote/${user_id}`);
    return res.status(200).json({ data: result.data });
  } catch (err) {
    return res.status(400).json({
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const postUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await axios.post(`http://user-service:3003/api/user`, { email, name, password });
    return res.status(201).json({ data: user.data });
  } catch (err) {
    return res.status(400).json({
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

module.exports = {
  getUser,
  findUser,
  deleteUser,
  updateUser,
  findUserById,
  patchVoteXu,
  postUser,
  findNameUser,
  updateAvataUser
};
