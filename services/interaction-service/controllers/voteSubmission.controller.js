const { handepostVoteSubmission, handeDeleteVoteSubmission, handleGetSumVoteSubmission, handefindVoteSub, handesumvotesub } = require("../services/voteSubmission.services");

module.exports = {
    postVoteSubmission: async (req, res) => {
        try {
            const { submission_id, user_id } = req.body;
            const result = await handepostVoteSubmission(submission_id, user_id);

            return res.status(200).json({
                data: result,
                message: "Ban vote Submission thành công!",
            });

        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || "Có lỗi xảy ra khi gọi API!",
            });
        }
    },
    deleteVoteSubmission: async (req, res) => {
        try {
            const { submission_id, user_id } = req.params;
            const data = await handeDeleteVoteSubmission(submission_id, user_id);
            return res.status(200).json({
                data: data,
                message: "Xóa Submission thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    getsumVoteSubmission: async (req, res) => {
        try {
            const submission_id = req.params.id;
            const totalvotes = await handleGetSumVoteSubmission(submission_id);
            return res.status(200).json({
                id: submission_id,
                sumvote: totalvotes
            });
        } catch (err) {
            return res.status(400).json({
                error: err.message
            });
        }
    },
    findVoteSub: async (req, res) => {
        try {
            const { submission_id, user_id } = req.params;
            const result = await handefindVoteSub(submission_id, user_id);
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
    sumvoteSub: async (req, res) => {
        try {
            const { topic_id } = req.params;
            const data = await handesumvotesub(topic_id);
            return res.status(200).json({
                data: data,
                message: "Lấy Tổng VoteSub thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    }

 }
