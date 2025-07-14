
const Submission = require("../models/submission.model");
const axios = require('axios');
const handeGetSubmission = async (user_id) => {
    const filter = user_id ? { user_id } : {};
    return await Submission.find(filter).sort({ submitted_at: -1 });
};
const handeFindSubmission_Topic = async (topic_id, user_id) => {
    if (!topic_id || !user_id) {
        throw new Error("Thiếu thông tin!");
    }
    const data = await Submission.find({ topic_id, user_id });
    return data;
};
const handeFindSub_Topic = async (topic_id) => {
    if (!topic_id) {
        throw new Error("Thiếu thông tin!");
    }
    const data = await Submission.find({ topic_id });
    return data;
};
const handlePostSubmission = async (user_id, topic_id, title, imageUrl) => {

    const submission = await Submission.create({
        user_id: user_id,
        topic_id: topic_id,
        title: title,
        image: imageUrl,
    });

    if (!submission) {
        throw new Error("Thêm không thành công!");
    }

    return submission;
};
const handeDeleteSubmission = async (_id, user_id) => {
    const data = await Submission.findById(_id);
    if (!data) throw new Error("Submission không tồn tại!");
    if (data.user_id.toString() !== user_id.toString()) {
        throw new Error("Không phải chủ sở hữu bài đăng!");
    }
    const img = data.image;
    // Gửi các yêu cầu xoá liên quan
    const [toprankRes, commentRes, likeRes, media] = await Promise.all([
        axios.delete(`http://topranking-service:3007/api/topranking/${_id}`),
        axios.delete(`http://interaction-service:3006/api/interaction/deletemany/comments/${_id}`),
        axios.delete(`http://interaction-service:3006/api/interaction/deletemany/likes/${_id}`),
        axios.delete(`http://media-service:5000/api/media/delete`, {
            data: { img }
        })
    ]);

    // Kiểm tra phản hồi từ các service
    const allSuccess =
        toprankRes.data?.check === true &&
        commentRes.data?.check === true &&
        likeRes.data?.check === true &&
        media.data?.check === true;

    if (!allSuccess) {
        throw new Error("Xoá dữ liệu liên quan thất bại!");
    }

    const Sub = await Submission.deleteOne({ _id });
    return Sub;
};



module.exports = { handeGetSubmission, handlePostSubmission, handeFindSubmission_Topic, handeDeleteSubmission, handeFindSub_Topic };