const voteTopic = require('../models/voteTopic.model');
const axios = require('axios');
module.exports = {
    findcheckvoteTopicUser: async (req, res) => {
        try {
            const userID = req.params.id;

            const response = await axios.get("http://topic-service:3004/api/topic");
            const lastItem = response.data.data.at(-1);

            if (!lastItem) {
                throw new Error("Không tìm thấy chủ đề nào.");
            }

            const votecheck = await voteTopic.findOne({
                topic_id: lastItem._id,
                user_id: userID
            });

            if (!votecheck) {
                throw new Error("Bạn chưa đăng ký chủ đề");
            }

            const time = Date.now();
            const start = new Date(lastItem.start_time).getTime();
            const end = new Date(lastItem.end_time).getTime();

            if (time <= start || time >= end) {
                throw new Error("Thời gian đăng bài nằm ngoài thời gian tham gia chủ đề");
            }

            return res.status(200).json({
                check:true,
                data: lastItem,
                message: "Đạt điều kiện đăng bài!",
            });
        } catch (error) {
            return res.status(400).json({
                check:false,
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    postVoteTopic: async (req, res) => {
        try {
            const check=false;
            const { topic_id, user_id } = req.body;
            if (!topic_id || !user_id) {
                throw new Error("Thiếu thông tin!");
            }
            const result = await voteTopic.findOne({ topic_id, user_id });
            if (result) {
                check=true;
            }
            let response;
            try {
                response = await axios.patch(`http://user-service:3003/api/user/vote/${user_id}`);
            } catch (err) {
                throw new Error("Có lỗi xảy ra khi gọi API trừ xu!");
            }
            if (response && response.data && response.data.check === false) {
                throw new Error(response.data.message);
            }
            const data=[];
            if(response.data.check==true)
            {
             data = await voteTopic.create({ topic_id, user_id });
            }
    
            return res.status(200).json({
                data: data,
                message: "Ban vote topic thành công!",
            });
    
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || "Có lỗi xảy ra khi gọi API!",
            });
        }
    },
    deleteVoteTopic: async(req,res)=>{
        try {
            const { topic_id, user_id } = req.query;
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
