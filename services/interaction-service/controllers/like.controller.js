
const { handleGetSumLike, handePostlike, handeDeletelike, handefindlike, deletelikeMany } = require('../services/like.services');
module.exports = {
    getsumlike: async (req, res) => {
        try {
            const submission_id = req.params.id;
            const totalLikes = await handleGetSumLike(submission_id);
            return res.status(200).json({
                id: submission_id,
                sumlike: totalLikes
            });
        } catch (err) {
            return res.status(400).json({
                error: err.message
            });
        }
    },
    postlike: async (req, res) => {
        try {
            const { submission_id, user_id } = req.body;
            const result = await handePostlike(submission_id, user_id);

            return res.status(200).json({
                data: result,
                message: result.wasLiked
                    ? "Bạn đã like bài viết trước đó!"
                    : "Like thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: null,
                message: error.message || "Có lỗi xảy ra!",
            });
        }
    },

    deletelike: async (req, res) => {
        try {
            const { submission_id, user_id } = req.params;
            const result = await handeDeletelike(submission_id, user_id);

            return res.status(200).json({
                data: result,
                message: result.wasLiked ? "Đã bỏ like!" : "Bạn chưa like bài viết!",
            });
        } catch (error) {
            return res.status(400).json({
                data: null,
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },

    findlike: async (req, res) => {
        try {
            const { submission_id, user_id } = req.params;
            const result = await handefindlike(submission_id, user_id);
            return res.status(200).json({

                check: result,
            });
        } catch (error) {
            return res.status(500).json({

                check: false,
                message: error.message || "Có lỗi xảy ra!",
            });
        }
    },
    deleteMany: async (req, res) => {
        try {
            const submission_id = req.params.submission_id;
            const result = await deletelikeMany(submission_id);
            return res.status(200).json({
                data: result,
                check: true

            });
        } catch (error) {
            return res.status(500).json({


                message: error.message || "Có lỗi xảy ra!",
            });
        }
    }
}