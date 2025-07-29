const axios = require('axios');
const userScoreModel = require("../models/userScore.model");
const AppError = require('../utils/AppError');
const handlewithdramwUser = async (data) => {
    const { user_id, password, totalScore } = data;
    const userScore = await userScoreModel.findOne({ user_id: user_id });
    if (!userScore) {
        throw new AppError("Không tìm thấy điểm người dùng!", 404);
    }

    if (userScore.totalScore < totalScore) {
        throw new AppError("Số dư không đủ!", 422);
    }

    await userScoreModel.findOneAndUpdate(
        { user_id },
        { $inc: { totalScore: -totalScore } }
    );
    return true;
}
const handleSumTopRanking = async () => {
    const result = await userScoreModel.find({}).sort({ totalScore: -1 });
    const Toprank = await Promise.all(
        result.map(async (post) => {
            try {
                const userRes = await axios.get(`http://user-service:3003/api/user/findID/${post.user_id}`);
                const user = userRes.data?.data;
                return {
                    ...post._doc,
                    user_name: user?.name || "Unknown",
                    avatar: user?.image || null,
                };
            } catch (userErr) {
                return {
                    ...post._doc,
                    user_name: "Unknown",
                    avatar: null,
                };
            }
        }))
    return Toprank;
};
const handlefindUserScore = async (user_id) => {
    return await userScoreModel.findOne({ user_id });
};

module.exports = { handleSumTopRanking, handlewithdramwUser, handlefindUserScore };