const { handlePostDepositRequest, handlePostWithdrawRequest, handlegetDepositRequest, handlegetWithdrawRequest } = require("../services/banking.services");
const postdepositRequet = async (req, res) => {
   try {
      const data = req.body;
      console.log(data);
      const datanew = await handlePostDepositRequest(data);
      return res.status(200).json({
         data: datanew,
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
const GetDepositRequest = async (req, res) => {
   try {
      const user_id = req.params.id;
      const data = await handlegetDepositRequest(user_id);
      return res.status(200).json({
         data: data,
         message: "Lấy danh sách thành công!"

      });
   } catch (error) {
      return res.status(400).json({
         message: error.message || "Có lỗi xảy ra!"
      })
   }
}
const GetWithdrawRequest = async (req, res) => {
   try {
      const user_id = req.params.id;
      const data = await handlegetWithdrawRequest(user_id);
      return res.status(200).json({
         data: data,
         message: "Lấy danh sách thành công!"

      });
   } catch (error) {
      return res.status(400).json({
         message: error.message || "Có lỗi xảy ra!"
      })
   }
}
module.exports = { postdepositRequet, postwithdrawRequet, GetDepositRequest, GetWithdrawRequest };