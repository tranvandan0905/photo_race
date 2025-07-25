const axios = require('axios');
const userScoreModel = require("../models/userScore.model");
const AppError = require('../utils/AppError');
const handlewithdramwUser = async (data) => {
    const { user_id, password, totalScore } = data;
        const userScore = await userScoreModel.findOne({ user_id:user_id });
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

const handlefindUserScore = async (user_id) => {
    return await userScoreModel.findOne({ user_id });
};

module.exports = { handlewithdramwUser, handlefindUserScore };