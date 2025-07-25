const VoteSubmission = require('../models/voteSubmission.model');
const axios = require('axios');
const getLastTopic = async () => {
    const response = await axios.get("http://topic-service:3004/api/topic");
    return response.data?.data.at(-1);
};
const isInVoteTime = (topic) => {
    const now = Date.now();
    const start = new Date(topic.start_time).getTime();
    const end = new Date(topic.end_time).getTime();
    return now > start && now < end;
};
const handleGetSumVoteSubmission = async (submission_id) => {
 

    const totalLikes = await VoteSubmission.countDocuments({ submission_id });
    return totalLikes;
};
const handepostVoteSubmission = async (submission_id, user_id) => {
   
    const existingVote = await VoteSubmission.findOne({ submission_id, user_id });
    if (existingVote) {
        throw new Error("Bạn đã Vote Submission!");
    }

    // const lastTopic = await getLastTopic();
    // if (!isInVoteTime(lastTopic)) {
    //     throw new Error("Bạn không thể Vote vì nằm ngoài thời gian cho phép!");
    // }

    try {
        const response = await axios.patch(`http://user-service:3003/api/user/vote/${user_id}`);
        if (response?.data?.check === false) {
            throw new Error(response.data.message);
        }
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Không thể kết nối đến user-service!";
        throw new Error(message);
    }
    const data = await VoteSubmission.create({ submission_id, user_id });
     const Sumvote = await VoteSubmission.countDocuments({ submission_id });
    return {
        isVoted: true,
        VoteCount: Sumvote,
        wasVoted: !!data
    };
};

// Xóa vote
const handeDeleteVoteSubmission = async (submission_id, user_id) => {
   

    const existingVote = await VoteSubmission.findOne({ submission_id, user_id });
    if (!existingVote) {
        throw new Error("Không tìm thấy VoteSubmission!");
    }

    const lastTopic = await getLastTopic();
    if (!isInVoteTime(lastTopic)) {
        throw new Error("Bạn không thể xóa vì nằm ngoài thời gian cho phép!");
    }
    try {
        const response = await axios.patch(`http://user-service:3003/api/user/vote/Cancel/${user_id}`);
        if (response?.data?.check === false) {
            throw new Error(response.data.message);
        }
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Không thể kết nối đến user-service!";
        throw new Error(message);
    }

    const data = await VoteSubmission.findOneAndDelete({ submission_id, user_id });
        const Sumvote = await VoteSubmission.countDocuments({ submission_id });
    if (!data) {
        throw new Error("VoteSubmission không tồn tại!");
    }

    return {
        isVoted: false,
        VoteCount: Sumvote,
        wasVoted: !!data
    };
};
const handefindVoteSub = async (submission_id, user_id) => {
 
       if(!user_id)
    {
         return false;
    }
    const result = await VoteSubmission.findOne({ submission_id, user_id });
    if (result) {
        return true;
    }
    return false;
}
module.exports = {
    handeDeleteVoteSubmission, handepostVoteSubmission, handleGetSumVoteSubmission, handefindVoteSub
};
