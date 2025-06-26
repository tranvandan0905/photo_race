const axios = require('axios');

const getTopic = async (req, res) => {
  try {
    const response = await axios.get('http://topic-service:3004/api/topic');
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const postTopic = async (req, res) => {
  try {
    const response = await axios.post('http://topic-service:3004/api/topic', req.body);
    return res.status(201).json({ data: response.data });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const updateTopic = async (req, res) => {
  try {
    const response = await axios.put(`http://topic-service:3004/api/topic/${req.params.id}`, req.body);
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const deleteTopic = async (req, res) => {
  try {
    await axios.delete(`http://topic-service:3004/api/topic/${req.params.id}`);
    return res.status(200).json({ message: "Xoá thành công!" });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};

const findTopic = async (req, res) => {
  try {
    const  title  = req.query;
    const response = await axios.get('http://topic-service:3004/api/topic/find', {
      params:title 
    });
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};  

module.exports = {
  getTopic,
  postTopic,
  updateTopic,
  deleteTopic,
  findTopic,
};
