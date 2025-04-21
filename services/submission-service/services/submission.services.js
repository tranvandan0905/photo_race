
const Submission = require("../models/submission.model");
const axios = require('axios');
const handeGetSubmission = async () => {
    const data = await Submission.find({});
    if (!data) {
        throw new Error("Không có bài đăng nào!");
    }
    return data;
};

const handlePostSubmission = async (title, image, userID) => {
    if (!topic_id || !title || !image) {
        throw new Error("Vui lòng điền đầy đủ thông tin!");
    }

    const submission = await Submission.create({
        user_id: userID,
        topic_id: topic_id,
        title: title,
        image: imageUrl,
    });

    if (!submission) {
        throw new Error("Thêm không thành công!");
    }

    return submission;
};
module.exports={handeGetSubmission,handlePostSubmission};