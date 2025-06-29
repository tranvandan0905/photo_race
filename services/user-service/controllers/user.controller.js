
const { handlePostUser, handGetUser, handleDeleteUser, handleUpdateUser, handeFindUser, handleFindIDUser, handePatchVoteXU, handeCancelVoteXU, handleFindNameUser, handleemailconfirmation, handleverifyUser } = require("../services/user.services");
const { sendVerificationEmail } = require('./email.controller');

module.exports = {
    getuser: async (req, res) => {
        try {
            const { check } = req.query;
            const data = await handGetUser(check);
            return res.status(200).json({
                data: data,
                message: "Lấy user thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    postuser: async (req, res) => {

        try {
            const { email, name, password } = req.body;
            const user = await handlePostUser({ email, name, password });
            return res.status(201).json({
                data: user,
                message: "Thêm thành công!"
            })

        } catch (error) {

            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    deleteduser: async (req, res) => {
        try {
            const _id = req.params.id;
            const result = await handleDeleteUser(_id);
            return res.status(204).json({
                data: result,
                message: "Xóa user thành công!"
            })

        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!',
            })
        }
    },
    updateuser: async (req, res) => {
        try {
            const _id = req.params.id;
            const data = req.body;
            const result = await handleUpdateUser(data, _id);
            return res.status(200).json({
                data: result,
                message: "Edit thành công!",
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!',
            })
        }
    },
    FindIDuser: async (req, res) => {
        try {
            const _id = req.params.id;
            const result = await handleFindIDUser(_id);
            return res.status(200).json({
                data: result,
                message: "Tìm kiếm thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || "Có lỗi xảy ra!",
            });
        }
    },
    findUser: async (req, res) => {
        try {
            const { email } = req.query;
            const user = await handeFindUser(email);
            return res.status(200).json({
                data: user
            });
        } catch (err) {
            return res.status(400).json({
                data: [],
                message: err.message || "Có lỗi xảy ra!",
            });
        }
    },
    findNameUser: async (req, res) => {
        try {
            const { name } = req.query;
            const user = await handleFindNameUser(name);
            return res.status(200).json({
                data: user
            });
        } catch (err) {
            return res.status(400).json({
                message: err.message || "Có lỗi xảy ra!",
            });
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


    emailconfirmation: async (req, res) => {

        try {
            const { email, name, password } = req.body;
            const check_email = await handleemailconfirmation(email, name, password);
            return res.status(200).json({
                message:check_email
            });
        } catch (err) {
            return res.status(400).json({
              
                message: err.message || "Có lỗi xảy ra!",
            });
        }
    },

    verifyUser: async (req, res) => {

        try {
            const { token } = req.query;

            const check_email = await handleverifyUser(token);
            return res.status(200).json({
                data: check_email
            });
        } catch (err) {
            return res.status(400).json({
            
                message: err.message || "Có lỗi xảy ra!",
            });
        }
    }

}
