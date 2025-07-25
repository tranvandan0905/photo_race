const { handletopranking, handleSumTopRanking, handeFindTopic_sub, handeTopranking_New, deleteSubTopranking } = require("../services/topranking.services");
const { success } = require("../utils/response.util");

const topranking = async (req, res,next) => {
    try {
        const {ranklike, rankcommnet, rankvote}=req.query;
        const data = await handletopranking(ranklike, rankcommnet, rankvote);
        return res.status(200).json(success(data, "Xét topranking thành công!"));
    } catch (error) {
       next(error);
    }
}
const sumtopranking = async (req, res,next) => {
    try {
        const data = await handleSumTopRanking();
        return res.status(200).json(success(data,"Lấy topranking thành công!"));
    } catch (error) {
            next(error);      
    }
}
const FindTopic_sub = async (req, res,next) => {
    try {
        const { topic_id } = req.params;
        const data = await handeFindTopic_sub(topic_id);
        return res.status(200).json(success(data,"Lấy topranking thành công!"));
    } catch (error) {
    next(error);
    }
}
const Topranking_New = async (req, res,next) => {
    try {

        const data = await handeTopranking_New();
        return res.status(200).json(success(data,"Lấy topranking thành công!"));
    } catch (error) {
     next(error);
    }
}
const deleteSub = async (req, res,next) => {
    try {
        const submission_id = req.params.submission_id;
        const data = await deleteSubTopranking(submission_id);
        return res.status(200).json({
            data: data,
            check:true
           
        });
    } catch (error) {
     next(error);
    }
}
module.exports = { topranking, sumtopranking, FindTopic_sub, Topranking_New, deleteSub }