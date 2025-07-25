const axios = require('axios');

const getTopic = async (req, res,next) => {
  try {
    const response = await axios.get('http://topic-service:3004/api/topic');
    return res.status(200).json(response.data);
  } catch (error) {
   next(error);
  }
};

const postTopic = async (req, res,next) => {
  try {
    const response = await axios.post('http://topic-service:3004/api/topic', req.body);
    return res.status(201).json(response.data);
  } catch (error) {
      next(error);
  }
};

const updateTopic = async (req, res,next) => {
  try {
    const response = await axios.put(`http://topic-service:3004/api/topic/${req.params.id}`, req.body);
    return res.status(200).json(response.data);
  } catch (error) {
       next(error);
  }
};

const deleteTopic = async (req, res,next) => {
  try {
    const data =await axios.delete(`http://topic-service:3004/api/topic/${req.params.id}`);
    return res.status(200).json(data.data);
  } catch (error) {
     next(error);
  }
};

const findTopic = async (req, res,next) => {
  try {
    const  title  = req.query;
    const response = await axios.get('http://topic-service:3004/api/topic/find', {
      params:title 
    });
    return res.status(200).json(response.data);
  } catch (error) {
   next(error);
  }
};  

module.exports = {
  getTopic,
  postTopic,
  updateTopic,
  deleteTopic,
  findTopic,
};
