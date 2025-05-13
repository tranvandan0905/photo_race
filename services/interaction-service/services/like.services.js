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

    const existing = await like.findOne({ submission_id, user_id });
    if (!existing) {
        await like.create({ submission_id, user_id });
    }

    const likeCount = await like.countDocuments({ submission_id });
    return {
        isLiked: true,
        likeCount: likeCount,
        wasLiked: !!existing 
    };
};
const handeDeletelike = async (submission_id, user_id) => {
    if (!submission_id || !user_id) {
        throw new Error("Thiếu dữ liệu!");
    }

    const deleted = await like.findOneAndDelete({ submission_id, user_id });
    const likeCount = await like.countDocuments({ submission_id });
    return {
        isLiked: false,
        likeCount: likeCount,
        wasLiked: !!deleted 
    };
};

const handefindlike = async (submission_id, user_id) => {
    if (!submission_id || !user_id) {
        throw new Error("Thiếu ID!");
    }
    const result = await like.findOne({ submission_id, user_id });
    if(result)
    {
         return true ;
    }
    return false;
}
module.exports = { handleGetSumLike, handePostlike, handeDeletelike, handefindlike };