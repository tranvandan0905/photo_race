const voteTopic = require('../models/voteTopic.model');
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
const handefindcheckvoteTopicUser = async (userID) => {
    const lastTopic = await getLastTopic();
    if (!lastTopic) {
        throw new Error("Không tìm thấy chủ đề nào.");
    }
    const votecheck = await voteTopic.findOne({
        topic_id: lastTopic._id,
        user_id: userID
    });

    if (!votecheck) {
        throw new Error("Bạn chưa đăng ký chủ đề");
    }

    if (!isInVoteTime(lastTopic)) {
        throw new Error("Thời gian đăng bài nằm ngoài thời gian tham gia chủ đề");
    }

    return lastTopic;
};
const handepostVoteTopic = async (user_id) => {
    if (!user_id) {
        throw new Error("Thiếu thông tin!");
    }
    const lastTopic = await getLastTopic();
    const topic_id=lastTopic._id;
    const existingVote = await voteTopic.findOne({ topic_id, user_id });
    if (existingVote) {
        throw new Error("Bạn đã VoteTopic!");
    }

    if (!isInVoteTime(lastTopic)) {
        throw new Error("Bạn không thể VoteTopic vì nằm ngoài thời gian cho phép!");
    }

    try {
        const response = await axios.patch(`http://user-service:3003/api/user/vote/${user_id}`);
        if (response?.data?.check === false) {
            throw new Error(response.data.message);
        }
    } catch (err) {
        const message = err.response?.data?.message || err.message || "Không thể kết nối đến user-service!";
        throw new Error(message);
    }
    const data = await voteTopic.create({ topic_id, user_id });
    return data;
};

// Xóa vote
const handeDeleteVoteTopic = async (topic_id, user_id) => {
    if (!topic_id || !user_id) {
        throw new Error("Thiếu thông tin!");
    }

    const existingVote = await voteTopic.findOne({ topic_id, user_id });
    if (!existingVote) {
        throw new Error("Không tìm thấy VoteTopic!");
    }

    const lastTopic = await getLastTopic();
    if (!lastTopic || lastTopic._id !== topic_id) {
        throw new Error("Chủ đề không hợp lệ hoặc không phải chủ đề hiện tại!");
    }

    if (!isInVoteTime(lastTopic)) {
        throw new Error("Bạn không thể xóa vì nằm ngoài thời gian cho phép!");
    }

    const response = await axios.patch(`http://user-service:3003/api/user/vote/Cancel/${user_id}`);
    if (response?.data?.check === false) {
        throw new Error(response.data.message);
    }

    const data = await voteTopic.findOneAndDelete({ topic_id, user_id });
    if (!data) {
        throw new Error("VoteTopic không tồn tại!");
    }

    return data;
};
const handesumvotetopic = async (topic_id) => {
  const allVotes = await voteTopic.countDocuments({topic_id}); 
  return allVotes;
}

module.exports = {
    handesumvotetopic,
    handepostVoteTopic,
    handeDeleteVoteTopic,
    handefindcheckvoteTopicUser
};
