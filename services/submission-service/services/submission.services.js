const Submission = require("../models/submission.model");
const axios = require('axios');
const AppError = require("../utils/AppError");
const handeGetSubmission = async (user_id) => {
    const filter = user_id ? { user_id } : {};
    return await Submission.find(filter).sort({ submitted_at: -1 });
};
const handeFindSubmission_Topic = async (topic_id, user_id) => {
    const data = await Submission.find({ topic_id, user_id });
    return data;
};
const handeFindSub_Topic = async (topic_id) => {
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
    return submission;
};
const handegetPostCountByDateRange = async (data) => {
  const { startDate, endDate } = data;
  // Chuyển startDate và endDate về định dạng Date
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);
  const count = await Submission.countDocuments({
    submitted_at: {
      $gte: start,
      $lte: end
    }
  });

  return count;
};

const handeDeleteSubmission = async (_id, user_id) => {
    const data = await Submission.findById(_id);
    if (data.user_id.toString() !== user_id.toString()) {
        throw new AppError("Không phải chủ sở hữu bài đăng!",200);
    }
    const img = data.image;
    const [toprankRes, commentRes, likeRes, media] = await Promise.all([
        axios.delete(`http://topranking-service:3007/api/topranking/${_id}`),
        axios.delete(`http://interaction-service:3006/api/interaction/deletemany/comments/${_id}`),
        axios.delete(`http://interaction-service:3006/api/interaction/deletemany/likes/${_id}`),
        axios.delete(`http://media-service:5000/api/media/delete`, {
            data: { img }
        })
    ]);
    const allSuccess =
        toprankRes.data?.check === true &&
        commentRes.data?.check === true &&
        likeRes.data?.check === true &&
        media.data?.check === true;

    if (!allSuccess) {
        throw new AppError("Xoá dữ liệu liên quan thất bại!",200);
    }

    const Sub = await Submission.deleteOne({ _id });
    return Sub;
};



module.exports = { handegetPostCountByDateRange,handeGetSubmission, handlePostSubmission, handeFindSubmission_Topic, handeDeleteSubmission, handeFindSub_Topic };