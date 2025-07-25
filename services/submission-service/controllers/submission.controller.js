const { handeGetSubmission, handlePostSubmission, handeFindSubmission_Topic, handeDeleteSubmission, handeFindSub_Topic, handegetPostCountByDateRange } = require("../services/submission.services");
const { success } = require("../utils/response.util");

module.exports = {
  getsubmission: async (req, res, next) => {
    try {
      const user_id = req.query.user_id;
      const data = await handeGetSubmission(user_id);
      return res.status(200).json(success(data, "Lấy danh sách thành công!",));

    } catch (error) {
      next(error)
    }

  },
  getPostCountByDateRange: async (req, res, next) => {
    try {
      const data = await handegetPostCountByDateRange(req.body);
      return res.status(200).json(success(data, "Lấy thông tin thành công!",));

    } catch (error) {
      next(error)
    }

  },
  postsubmission: async (req, res, next) => {
    try {
      const { user_id, topic_id, title, imageUrl } = req.body;
      const data = await handlePostSubmission(user_id, topic_id, title, imageUrl)
      return res.status(200).json(success(data, "Thêm Submission thành công!"));

    } catch (error) {
      next(error)
    }
  },
  FindsubmissionTopic: async (req, res,next) => {
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
      next(error)
    }
  },

  deletesubmission: async (req, res,next) => {
    try {
      const _id = req.params.id;
      const user_id = req.params.user_id;
      const result = await handeDeleteSubmission(_id, user_id);
      return res.status(200).json(success(result,"Xóa Submission thành công!"));

    } catch (error) {
      next(error)
    }

  },
  FindsubTopic: async (req, res,next) => {
    try {
      const { topic_id } = req.params;
      const data = await handeFindSub_Topic(topic_id);
      return res.status(200).json(success(data));

    } catch (error) {
      next(error)
    }
  },

}