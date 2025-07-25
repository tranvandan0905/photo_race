
const axios = require('axios');

const findbankacc = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const response = await axios.get(`http://user-service:3003/api/user/bankAcc/${user_id}`);
        return res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};
const findbankaccuser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const response = await axios.get(`http://user-service:3003/api/user/bankAcc/${user_id}`);
        return res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};
const postbankacc = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const { bank_name, name, account_number, transactionPassword } = req.body;
        const data = { bank_name, name, account_number, transactionPassword, user_id }
        const response = await axios.post('http://user-service:3003/api/user/bankAcc', data);
        return res.status(201).json(response.data);
    } catch (error) {
        next(error);
    }
};

const updatebankacc = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const { bank_name, account_number, transactionPassword } = req.body;
        const data = { bank_name, account_number, transactionPassword, user_id }
        const response = await axios.put(`http://user-service:3003/api/user/bankAcc`, data);
        return res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};
module.exports = {
    updatebankacc,
    postbankacc,
    findbankacc,
    findbankaccuser
};
