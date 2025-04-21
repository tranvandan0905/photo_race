const voteTopic = require('../models/voteTopic.model');
const axios = require('axios');
module.exports = {
    findvoteTopicUser: async (req, res) => {
        try {
            const userID =  req.params.id;
    
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
                errorCode: 0,
                data: lastItem,
                message: "Đạt điều kiện đăng bài!",
            });
        } catch (error) {
            return res.status(400).json({
                errorCode: 1,
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    postvotetopic:async(req,res)=>{
        try {
            const {topic_id,user_id}=req.body;
            if(!topic_id || !user_id)
            {
                throw new Error("Thiếu thông tin!");
            }
            const data=await voteTopic.create({topic_id,user_id})
            return res.status(200).json({
                errorCode: 0,
                data: data,
                message: "Thêm thành công!"
            })

            
        } catch (error) {
            return res.status(400).json({
                errorCode: 1,
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }

    }
    
}
