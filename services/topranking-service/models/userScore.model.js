const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userScoreSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    totalScore: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('userScore', userScoreSchema);
