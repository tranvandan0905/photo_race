const { handeUpdateBankAcc, handlePostBankAcc, handGetBankAcc, handecheckpass } = require("../services/bankAccunt.sevices");
const { success } = require("../utils/response.util");

module.exports = {
    findbankacc: async (req, res, next) => {
        try {
            const user_id = req.params.id;
            const data = await handGetBankAcc(user_id);
            return res.status(200).json(success(data, "Lấy STK thành công!"));
        } catch (error) {
            next(error);
        }
    },
    postbankacc: async (req, res, next) => {

        try {

            const user = await handlePostBankAcc(req.body);
            return res.status(201).json(success(user, "Thêm STK thành công!"))

        } catch (error) {

            next(error);
        }
    },
    updatebankacc: async (req, res, next) => {
        try {
            const data = req.body;
            const result = await handeUpdateBankAcc(data);
            return res.status(200).json(success(result, "Edit thành công!")

            )
        } catch (error) {
            next(error);
        }
    },
    checkpass: async (req, res, next) => {
        try {
            const user = await handecheckpass(req.query);
            return res.status(200).json(success(user)
            );
        } catch (error) {
            next(error);
        }
    },
}