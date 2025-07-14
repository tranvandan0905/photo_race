const { handeGetSubmission, handlePostSubmission, handeFindSubmission_Topic, handeDeleteSubmission, handeFindSub_Topic } = require("../services/submission.services");

module.exports = {
  getsubmission: async (req, res) => {
    try {
      const user_id = req.query.user_id;
      const data = await handeGetSubmission(user_id);
      return res.status(200).json({
        errorCode: 0,
        data: data,
        message: "Lấy danh sách thành công!",
      });

    } catch (error) {
      return res.status(400).json({
        errorCode: 1,
        data: [],
        message: error.message || 'Có lỗi xảy ra!',
      })
    }

  },
  postsubmission: async (req, res) => {
    try {
      const { user_id, topic_id, title, imageUrl } = req.body;
      const data = await handlePostSubmission(user_id, topic_id, title, imageUrl)
      return res.status(200).json({
        errorCode: 0,
        data: data,
        message: "Thêm Submission thành công!",
      });

    } catch (error) {

      return res.status(400).json({
        errorCode: 1,
        data: [],
        message: error.message || 'Có lỗi xảy ra!',
      });
    }
  },
  FindsubmissionTopic: async (req, res) => {
    try {
      const { topic_id, user_id } = req.params;
      const data = await handeFindSubmission_Topic(topic_id, user_id);

      const hasSubmitted = data.length > 0;

      return res.status(200).json({
        errorCode: 0,
        check: hasSubmitted,
        message: hasSubmitted
          ? "Bạn đã có bài đăng cho chủ đề này!"
          : "Bạn chưa có bài đăng cho chủ đề!",
      });

    } catch (error) {
      return res.status(400).json({
        errorCode: 1,
        message: error.message || "Lỗi khi kiểm tra submission",
      });
    }
  },

  deletesubmission: async (req, res) => {
    try {
      const _id = req.params.id;
      const user_id = req.params.user_id;
      const result = await handeDeleteSubmission(_id, user_id);
      return res.status(200).json({
        errorCode: 0,
        data: result,
        message: "Xóa Submission thành công!"
      })

    } catch (error) {
      return res.status(400).json({
        errorCode: 1,
        message: error.message || 'Có lỗi xảy ra!',
      })
    }

  },
  FindsubTopic: async (req, res) => {
    try {
      const { topic_id } = req.params;
      const data = await handeFindSub_Topic(topic_id);
      return res.status(200).json({
        data: data,
        errorCode: 0
      });

    } catch (error) {
      return res.status(400).json({
        errorCode: 1,
        message: error.message || "Lỗi khi lấy danh sách",
      });
    }
  },

}