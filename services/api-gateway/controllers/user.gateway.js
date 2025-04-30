const axios = require('axios');

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
    const { name } = req.query;
    const response = await axios.get("http://user-service:3003/api/user/find", {
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
    const user_id = req.params.id;
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
    const user_id = req.params.id;
    const result = await axios.get(`http://user-service:3003/api/user/findID/${user_id}`);
    return res.status(200).json({ data: result.data.data });
  } catch (err) {
    return res.status(400).json({
      message: err.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
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
  postUser
};
