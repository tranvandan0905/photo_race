const like = require('../models/like.model');
const handleGetSumLike = async (submission_id) => {

    const totalLikes = await like.countDocuments({ submission_id });
    return totalLikes;
};
const handePostlike = async (submission_id, user_id) => {
  
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


    const deleted = await like.findOneAndDelete({ submission_id, user_id });
    const likeCount = await like.countDocuments({ submission_id });
    return {
        isLiked: false,
        likeCount: likeCount,
        wasLiked: !!deleted
    };
};

const handefindlike = async (submission_id, user_id) => {

    if(!user_id)
    {
         return false;
    }
    const result = await like.findOne({ submission_id, user_id });
    if (result) {
        return true;
    }
    return false;
};
const deletelikeMany = async (submission_id) => {
    return await like.deleteMany({ submission_id });
}

module.exports = { handleGetSumLike, handePostlike, handeDeletelike, handefindlike ,deletelikeMany};