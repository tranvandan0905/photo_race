
const { handlePostUser, handGetUser, handleDeleteUser, handleUpdateUser, handeFindUser, handleFindIDUser, handePatchVoteXU, handeCancelVoteXU, handleFindNameUser, handleemailconfirmation, handleverifyUser, handeUpdateXU, handleemailpassword, handleverifyForgotPassword, handecheckpass, handegetPostUserCountByDateRange } = require("../services/user.services");
const { success } = require("../utils/response.util");
module.exports = {
    getuser: async (req, res,next) => {
        try {
            const { check } = req.query;
            const data = await handGetUser(check);
            return res.status(200).json(success(data, "Lấy user thành công!"));
        } catch (error) {
            next(error); 
        }
    },
    postuser: async (req, res,next) => {

        try {
            const { email, name, password } = req.body;
            const user = await handlePostUser({ email, name, password });
            return res.status(201).json(success(user,"Thêm user thành công!"))

        } catch (error) {

           next(error);
        }
    },
     getPostUserCountByDateRange: async (req, res, next) => {
        try {
          const data = await handegetPostUserCountByDateRange(req.body);
          return res.status(200).json(success(data, "Lấy thông tin thành công!",));
    
        } catch (error) {
          next(error)
        }
    
      },
    deleteduser: async (req, res,next) => {
        try {
            const _id = req.params.id;
            const result = await handleDeleteUser(_id);
            return res.status(200).json(success(result,"Xóa user thành công!"))

        } catch (error) {
              next(error);
        }
    },
    updateuser: async (req, res,next) => {
        try {
            const _id = req.params.id;
            const data = req.body;
            const result = await handleUpdateUser(data, _id);
            return res.status(200).json(success(result,"Edit thành công!")
                
            )
        } catch (error) {
           next(error);
        }
    },
    FindIDuser: async (req, res,next) => {
        try {
            const _id = req.params.id;
            const result = await handleFindIDUser(_id);
            return res.status(200).json(success(result,"Tìm kiếm thành công!"));
        } catch (error) {
             next(error);
        }
    },
    findUser: async (req, res,next) => {
        try {
            const { email } = req.query;
            const user = await handeFindUser(email);
            return res.status(200).json(success(user,"Tìm kiếm thành công!")
               
            );
        } catch (error) {
           next(error);
        }
    },
  
    findNameUser: async (req, res,next) => {
        try {
            const { name } = req.query;
            const user = await handleFindNameUser(name);
            return res.status(200).json(success(user,"Tìm kiếm người dùng theo tên thành công!"));
        } catch (error) {
          next(error);
        }
    },
    PatchVoteXU: async (req, res) => {
        try {
            const _id = req.params.id;
            const xu = await handePatchVoteXU(_id);
            return res.status(200).json({
                check: true,
                message: "Đã thanh toán xu thành công!"
            });
        } catch (err) {
            return res.status(400).json({
                check: false,
                message: err.message || "Có lỗi xảy ra!",
            });
        }
    },
    CancelVoteXu: async (req, res) => {
        try {
            const _id = req.params.id;
            const xu = await handeCancelVoteXU(_id);
            return res.status(200).json({
                check: true,
                message: "Đã thanh toán xu thành công!"
            });
        } catch (err) {
            return res.status(400).json({
                check: false,
                message: err.message || "Có lỗi xảy ra!",
            });
        }
    },


    emailconfirmation: async (req, res,next) => {

        try {
            const { email, name, password } = req.body;
            const message = await handleemailconfirmation(email, name, password);
            return res.status(200).json(success(null,message));
        } catch (err) {
            next(err)
        }
    },

    emailpassword: async (req, res,next) => {

        try {
            const { email } = req.body;
            const message = await handleemailpassword(email);
            return res.status(200).json(success(null,message));
        } catch (err) {
          next(err)
        }
    },
    verifyUser: async (req, res,next) => {

        try {
            const { token } = req.query;

            const check_email = await handleverifyUser(token);
            return res.status(200).json({
                data: check_email
            });
        } catch (err) {
          next(err)
        }
    },
    verifyForgotPassword: async (req, res,next) => {

        try {
            const { token, pasword, email } = req.body;

            const check_email = await handleverifyForgotPassword(token, pasword, email);
            return res.status(200).json({
                data: check_email
            });
        } catch (err) {
           next(err)
        }
    },
    updateXU: async (req, res,next) => {

        try {
            const _id = req.params.id;
            const data = await handeUpdateXU(_id, req.body);
            return res.status(200).json(success(data));
        } catch (err) {
             next(err)
        }
    }

}
