const bankAccountModel = require("../models/bankAccount.model");
const AppError = require("../utils/AppError");
const handGetBankAcc = async (user_id) => {
    const data = await bankAccountModel.findOne({ user_id });
    return data;
}; 

const handlePostBankAcc = async (data) => {
    const { bank_name, name, account_number, transactionPassword, user_id } = data;
    const newtopic = await bankAccountModel.create({
        bank_name,
        name,
        account_number,
        transactionPassword,
        user_id
    })
    return newtopic;
};
const handecheckpass = async (data) => {
    const { user_id, password } = data;

    const user = await bankAccountModel.findOne({ user_id: user_id });

    if (!user) {
       throw new AppError(" Bạn chưa liên kết tài khoản", 200);
    }
    if (user.transactionPassword !== password)
             throw new AppError("Sai mật khẩu giao dịch", 200);
    return true;
};
const handeUpdateBankAcc = async (data) => {
    const { bank_name, account_number, transactionPassword, user_id } = data;
    const topicid = await bankAccountModel.findOne({ user_id });
    if (!topicid) {
        throw new AppError(" không tồn tại!", 200);
    }
    const _id = topicid._id;
    const updatedTopic = await bankAccountModel.findOneAndUpdate(
        { _id },
        {
            $set: {
                bank_name: bank_name || topicid.bank_name,
                account_number: account_number || topicid.account_number,
                transactionPassword: transactionPassword || topicid.transactionPassword
            },
        },
        { new: true }
    );
    return updatedTopic;

};
module.exports = { handGetBankAcc, handlePostBankAcc, handeUpdateBankAcc, handecheckpass };