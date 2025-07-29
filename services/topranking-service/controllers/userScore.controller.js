
const { handlefindUserScore, handlewithdramwUser, handleSumTopRanking } = require("../services/userScore.services");
const { success } = require("../utils/response.util");

const withdramwUser = async (req, res, next) => {
    try {
        const data = await handlewithdramwUser(req.body);
        return res.status(200).json(success(data));
    } catch (error) {
        next(error);
    }
}
const findUserScore = async (req, res, next) => {
    try {
        const data = await handlefindUserScore(req.params.id);
        return res.status(200).json(success(data, "Tim kiếm thành công!"));
    } catch (error) {
        next(error);
    }
}
const sumtopranking = async (req, res, next) => {
    try {
        const data = await handleSumTopRanking();
        return res.status(200).json(success(data, "Lấy topranking thành công!"));
    } catch (error) {
        next(error);
    }
}
module.exports = {sumtopranking, withdramwUser, findUserScore }