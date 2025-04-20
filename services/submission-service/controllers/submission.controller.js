 const { handeGetSubmission } = require("../services/submission.services");

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
          const userID = req.headers["x-user-id"];
          console.log("SUBMISSION: Nhận x-user-id:", userID);
      
          return res.status(200).json({
            errorCode: 0,
            data: userID,
            message: "Thêm Submission thành công!",
          });
      
        } catch (error) {
          console.error("Lỗi submission:", error.message);
          return res.status(400).json({
            errorCode: 1,
            data: [],
            message: error.message || 'Có lỗi xảy ra!',
          });
        }
      }
      
}