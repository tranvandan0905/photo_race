 const { handeGetSubmission, handlePostSubmission } = require("../services/submission.services");

module.exports = {
    getsubmission: async (req, res) => {
        try {
            const data = await handeGetSubmission();
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
     postsubmission : async (req, res) => {
        try {
        const {user_id, topic_id, title, imageUrl }=req.body;
        const data=await handlePostSubmission(user_id, topic_id, title, imageUrl )
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
      }
      
}