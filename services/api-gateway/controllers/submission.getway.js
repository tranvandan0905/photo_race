const axios = require('axios');
const FormData = require('form-data');
const { success } = require('../utils/response.util');
const AppError = require('../utils/AppError');
const { isProfane } = require('../middlewares/validate.middleware');


const postsubmission = async (req, res, next) => {
  try {
    const title = req.body.title;
    const user_id = req.user.id;
    const image = req.file;
    if (isProfane(title)) {
      return res.status(400).json(success(null, "Tiêu đề chứa từ ngữ không phù hợp!"));
    }
    let votetopic;
    try {
      const resVote = await axios.get(`http://interaction-service:3006/api/interaction/votetopics/user/${user_id}`);
      votetopic = resVote.data?.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Lỗi không xác định khi gọi votetopics";
      return res.status(500).json(success(null, errorMessage));
    }
    const topic_id = votetopic?._id;
    if (!topic_id) {
      return res.status(400).json(success(null, "Bạn chưa vote cho chủ đề này!"));
    }
    const checktopic = await axios.get(`http://submission-service:3005/api/submission/findIDTopic/${topic_id}/${user_id}`);
    if (checktopic.data.check == true) {
      return res.status(400).json(success(null, "Bạn đã có bài dăng cho chủ đề này!"));
    }
    const form = new FormData();
    form.append("file", image.buffer, { filename: image.originalname, contentType: image.mimetype });

    const headers = form.getHeaders();

    const response = await axios.post(
      'http://media-service:5000/api/media/upload',
      form,
      { headers: headers }
    );

    const imageUrl = response.data?.data?.secure_url;
    if (!imageUrl) {
      throw new AppError("Lấy ảnh thất bại!", 200);
    }

    const submission = await axios.post(
      "http://submission-service:3005/api/submission",
      { user_id, topic_id, title, imageUrl }
    );

    return res.status(200).json(submission.data);

  } catch (error) {
    next(error)
  }
};
const getsubmission = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    const submissions = await axios.get(`http://submission-service:3005/api/submission`, {
      params: user_id ? { user_id } : {},
    });
    const sub = submissions?.data || [];

    const submissionsWithUser = await Promise.all(
      sub.data.map(async (post) => {
        try {
          const userRes = await axios.get(`http://user-service:3003/api/user/findID/${post.user_id}`);
          const user = userRes.data?.data;
          const likesRes = await axios.get(`http://interaction-service:3006/api/interaction/submissions/${post._id}/likes`);
          const totalLikes = likesRes.data.sumlike || 0;
          const response = await axios.get(`http://interaction-service:3006/api/interaction/submissions/${post._id}/comments`);
          const totalComments = response.data?.data?.total || 0;
          const votesRes = await axios.get(`http://interaction-service:3006/api/interaction/votesubmissions/${post._id}`);
          const totalVotes = votesRes.data.sumvote || 0;
          return {
            ...post,
            user_name: user?.name || "Unknown",
            avatar: user?.image || null,
            like: totalLikes,
            comment: totalComments,
            vote: totalVotes,
          };
        } catch (userErr) {

          return {
            ...post,
            user_name: "Unknown",
            avatar: null,
            like: 0,
            comment: 0,
            vote: 0,
          };
        }
      })
    )
    return res.status(200).json(success(submissionsWithUser, "Lấy danh sách bài đăng kèm thông tin user, tổng like, tổng comment, tổng vote thành công!"));

  } catch (error) {
    next(error)
  }
};
const FindsubTopic = async (req, res, next) => {
  try {
    const response = await axios.get(`http://submission-service:3005/api/submission/FindsubmissionTopic/${req.params.topic_id}`);
    return res.status(200).json(response.data);
  } catch (error) {
    next(error)

  }
};
const deletesubmission = async (req, res, next) => {
  try {
    const id = req.user.id;
    const id_sub = req.params.id;
    const response = await axios.delete(`http://submission-service:3005/api/submission/${id_sub}/${id}`);
    return res.status(200).json(response.data);
  } catch (error) {
    next(error)
  }
};
const getPostCountByDateRange = async (req, res, next) => {
  try {
    const response = await axios.post(`http://submission-service:3005/api/submission/sub-count-by-date`, req.body);
    return res.status(200).json(response.data);
  } catch (error) {
    next(error)
  }
};
module.exports = { getPostCountByDateRange, isProfane, postsubmission, getsubmission, FindsubTopic, deletesubmission };