const axios = require('axios');
const FormData = require('form-data');
const postsubmission = async (req, res) => {
  try {
    const title = req.body.title;
    const user_id = req.user.id;
    const image = req.file;
    if (!title || !image || !user_id) {
      throw new Error("Vui lòng điền đầy đủ thông tin!");
    }
    // Lấy topic đã vote của user
    let votetopic;
    try {
      const resVote = await axios.get(`http://interaction-service:3006/api/interaction/votetopics/user/${user_id}`);
      votetopic = resVote.data?.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Không thể lấy chủ đề đã vote!");
    }

    const topic_id = votetopic?._id;
    if (!topic_id) {
      throw new Error("Không tìm thấy topic đã vote!");
    }
    try {
      const checktopic = await axios.get(`http://submission-service:3005/api/submission/findIDTopic/${topic_id}/${user_id}`);
      if (checktopic.data.check) {
        throw new Error(checktopic.data.message);
      }

    } catch (err) {
      throw new Error(err.response?.data?.message || "Không thể kiểm tra bài submission!");
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
      throw new Error("Lấy ảnh thất bại!");
    }

    const submission = await axios.post(
      "http://submission-service:3005/api/submission",
      { user_id, topic_id, title, imageUrl }
    );

    return res.status(200).json({
      errorCode: 0,
      data: submission.data,
    });

  } catch (error) {
    return res.status(400).json({
      errorCode: 1,
      message: error?.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
    });
  }
};
const getsubmission = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const response = await axios.get(`http://submission-service:3005/api/submission`, {
      params: user_id ? { user_id } : {},
    });
    const submissions = response.data?.data || [];
    const submissionsWithUser = await Promise.all(
      submissions.map(async (post) => {
        try {
          // Lấy thông tin người dùng
          const userRes = await axios.get(`http://user-service:3003/api/user/findID/${post.user_id}`);
          const user = userRes.data?.data;

          // Lấy tổng số like
          const likesRes = await axios.get(`http://interaction-service:3006/api/interaction/submissions/${post._id}/likes`);
          const totalLikes = likesRes.data.sumlike || 0;

          // Lấy tổng số comment
          const response = await axios.get(`http://interaction-service:3006/api/interaction/submissions/${post._id}/comments`);
          const totalComments = response.data?.data?.total || 0;
          // Lấy tổng số vote
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
          // Nếu có lỗi khi lấy thông tin user, trả về thông tin mặc định
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
    );

    return res.status(200).json({
      errorCode: 0,
      data: submissionsWithUser,
      message: "Lấy danh sách bài đăng kèm thông tin user, tổng like, tổng comment, tổng vote thành công!",
    });

  } catch (error) {
    return res.status(400).json({
      errorCode: 1,
      message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
    });
  }
};

module.exports = { postsubmission, getsubmission };