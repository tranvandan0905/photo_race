const axios = require('axios');

const topranking = async (req, res,next) => {
  try {
    const {ranklike, rankcommnet, rankvote}= req.query;
    const response = await axios.get('http://topranking-service:3007/api/topranking',{
      params: {
        ranklike: (ranklike ?? 1),
        rankcommnet: (rankcommnet ?? 2),
        rankvote: (rankvote ?? 5),
      }});
    return res.status(200).json(response.data);
  } catch (error) {
      next(error);
  }
};
const sumtopranking = async(req,res,next)=>{
     try {
    const response = await axios.get('http://topranking-service:3007/api/topranking/toprank');
    return res.status(200).json(response.data);
  } catch (error) {
   next(error);
  }
};
const FindTopic_sub = async(req,res,next)=>{
     try {
    const response = await axios.get(`http://topranking-service:3007/api/topranking/topranking-topic/${req.params.topic_id}`);
    return res.status(200).json(response.data);
  } catch (error) {
     next(error);
  }
};
const sumtotal_score = async(req,res,next)=>{
     try {
    const response = await axios.get(`http://topranking-service:3007/api/topranking/sumtotalscore/${req.params.topic_id}`);
    return res.status(200).json(response.data);
  } catch (error) {
     next(error);
  }
};
const Topranking_New = async(req,res,next)=>{
     try {
    const response = await axios.get(`http://topranking-service:3007/api/topranking/new-user-topranking`);
    return res.status(200).json(response.data);
  } catch (error) {
      next(error);
  }
};
const findUserScore = async(req,res,next)=>{
     try {
   const id= req.user.id;
    const response = await axios.get(`http://topranking-service:3007/api/topranking/findUserScore/${id}`);
    return res.status(200).json(response.data);
  } catch (error) {
      next(error);
  }
};
module.exports={
    sumtopranking,topranking,FindTopic_sub,Topranking_New,findUserScore,sumtotal_score
}
