const axios = require('axios');

const topranking = async (req, res) => {
  try {
    const response = await axios.get('http://topranking-service:3007/api/topranking');
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    });
  }
};
const sumtopranking = async(req,res)=>{
     try {
    const response = await axios.get('http://topranking-service:3007/api/topranking/toprank');
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    }); 
  }
};
const FindTopic_sub = async(req,res)=>{
     try {
    const response = await axios.get(`http://topranking-service:3007/api/topranking/topranking-topic/${req.params.topic_id}`);
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(400).json({
      message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
    }); 
  }
};
module.exports={
    sumtopranking,topranking,FindTopic_sub
}