const { handlePostDepositRequest, handlePostWithdrawRequest } = require("../services/banking.services");
const postdepositRequet = async (req, res) => {
   try {
      const data = await handlePostDepositRequest(req.body);
      return res.status(200).json({
         data: data,
         message: "Xét banking thành công!"
      });
   } catch (error) {
      return res.status(400).json({
         message: error.message || 'Có lỗi xảy ra!'
      })
   }
}
const postwithdrawRequet = async (req, res) => {
   try {
      const data = await handlePostWithdrawRequest(req.body);
      return res.status(200).json({
         data: data,
         message: "Xét banking thành công!"
      });
   } catch (error) {
      return res.status(400).json({
         message: error.message || 'Có lỗi xảy ra!'
      })
   }
}
module.exports={postdepositRequet,postwithdrawRequet};