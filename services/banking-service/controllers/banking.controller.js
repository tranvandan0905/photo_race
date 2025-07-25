const { handlePostDepositRequest, handlePostWithdrawRequest, handlegetDepositRequest, handlegetWithdrawRequest, handegetPostDepositRequestCountByDateRange, handegetPostWithdrawRequestCountByDateRange, handlegetALLDepositRequest, handlegetALLWithdrawRequest, handeupdateWithdrawStatus } = require("../services/banking.services");
const postdepositRequet = async (req, res) => {
   try {
      const data = req.body;
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
const updatewithdrawRequet = async (req, res) => {
   try {
      const id=req.params.id;
      const  newStatus =req.body.newStatus;
      const data = await handeupdateWithdrawStatus(id,newStatus);
      return res.status(200).json({
         data: data,
         message: "Update withdraw thành công!"
      });
   } catch (error) {
      return res.status(400).json({

         message: error.message || 'Có lỗi xảy ra!',

      })
   }
}
const postwithdrawRequet = async (req, res) => {
   try {
      const data = await handlePostWithdrawRequest(req.body);
      return res.status(200).json({
         data: data,
         message: "Rút banking thành công!"
      });
   } catch (error) {
   
      return res.status(400).json({

         message: error.message || 'Có lỗi xảy ra!',

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
const getPostWithdrawRequestCountByDateRange = async (req, res) => {
   try {
      const data = await handegetPostWithdrawRequestCountByDateRange(req.body);
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
const getPostDepositRequestCountByDateRange = async (req, res) => {
   try {
      const data = await handegetPostDepositRequestCountByDateRange(req.body);
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
const GetALLDepositRequest = async (req, res) => {
   try {
      const data = await handlegetALLDepositRequest();
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
const GetALLWithdrawRequest = async (req, res) => {
   try {
      const data = await handlegetALLWithdrawRequest();
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
   module.exports = {GetALLDepositRequest,GetALLWithdrawRequest,getPostDepositRequestCountByDateRange,
      getPostWithdrawRequestCountByDateRange,updatewithdrawRequet,
       postdepositRequet, postwithdrawRequet, GetDepositRequest, GetWithdrawRequest };