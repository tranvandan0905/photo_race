const { handefindcheckvoteTopicUser, handepostVoteTopic, handeDeleteVoteTopic } = require('../services/voteTopic.services');
module.exports = {
    findcheckvoteTopicUser: async (req, res) => {
        try {
            const userID = req.params.id;
            const result = await handefindcheckvoteTopicUser(userID);
            return res.status(200).json({
                check: true,
                data: result,
                message: "Đạt điều kiện đăng bài!",
            });
        } catch (error) {
            return res.status(400).json({
                check: false,
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    postVoteTopic: async (req, res) => {
        try {
            const  {user_id}  = req.body;
            const result = await handepostVoteTopic( user_id);

            return res.status(200).json({
                data: result,
                message: "Ban vote topic thành công!",
            });

        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || "Có lỗi xảy ra khi gọi API!",
            });
        }
    },
    deleteVoteTopic: async (req, res) => {
        try {
            const { topic_id, user_id } = req.params;
            const data = await handeDeleteVoteTopic(topic_id, user_id);
            return res.status(200).json({
                data: data,
                message: "Xóa VoteTopic thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    }


}
