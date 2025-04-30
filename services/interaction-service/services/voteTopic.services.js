const  voteTopic= require('../models/voteTopic.model');
const deleteVoteTopic = async (topic_id, user_id) => {
    if (!topic_id || !user_id) {
        throw new Error("Thiếu ID!");
    }
     const data = await voteTopic.findOneAndDelete({ submission_id, user_id });
    if (!data) throw new Error("VoteTopic không tồn tại!");
    return data;
}
module.exports = { deleteVoteTopic};