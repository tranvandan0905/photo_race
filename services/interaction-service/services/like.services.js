const like = require('../models/like.model');
const handleGetSumLike = async (submission_id) => {
    if (!submission_id) {
        throw new Error("Không tìm thấy ID bài viết");
    }

    const totalLikes = await like.countDocuments({ submission_id });
    return totalLikes;
};
const handePostlike = async (submission_id, user_id) => {

    if (!submission_id || !user_id) {
        throw new Error("Thiếu dữ liệu!");
    }
    const result = await like.findOne({ submission_id, user_id });
    if (result) {
        throw new Error("Bạn Đã Like!");
    }
    const data = await like.create({ submission_id, user_id });

    return data;
};
const handeDeletelike = async (submission_id, user_id) => {
    if (!submission_id || !user_id) {
        throw new Error("Thiếu ID!");
    }
    const data = await like.findOneAndDelete({ submission_id, user_id });
    if (!data) throw new Error("like không tồn tại!");
    return data;
}
const handefindlike = async (submission_id, user_id) => {
    if (!submission_id || !user_id) {
        throw new Error("Thiếu ID!");
    }
    const result = await like.findOne({ submission_id, user_id });
    if (!result) throw new Error("like không tồn tại!");
    return result;
}
module.exports = { handleGetSumLike, handePostlike, handeDeletelike, handefindlike };