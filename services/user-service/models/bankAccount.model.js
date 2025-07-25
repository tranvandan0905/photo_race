const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankAccountSchema = new Schema({
    bank_name: { type: String, required: true },
    name:{ type: String, required: true },
    account_number: { type: String, required: true, unique: true },
    transactionPassword: { type: String, required: true },
    user_id: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
