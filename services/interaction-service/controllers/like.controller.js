
const { handleGetSumLike, handePostlike, handeDeletelike, handefindlike } = require('../services/like.services');
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
            const data = await handePostlike(submission_id, user_id);
            return res.status(200).json({
                data: data,
                message: "Like thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    deletelike: async (req, res) => {
        try {
            const { submission_id, user_id } = req.params;
            const data = await handeDeletelike(submission_id, user_id);
            return res.status(200).json({
                data: data,
                message: "Xóa like thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    findlike: async (req,res) => {
        try {
            const { submission_id, user_id } = req.query;
            const result = await handefindlike(submission_id, user_id);
            return res.status(200).json({
                data: result,
                check: true,
                message: "Tìm thấy thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: null,
                check: false,
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    }
}