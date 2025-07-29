const AppError = require("../utils/AppError");
const topranking = require("../models/topranking.model");
const axios = require('axios');
const userScoreModel = require("../models/userScore.model");
const handletopranking = async (ranklike, rankcomment, rankvote) => {
    const lastTopic = await getLastTopic();
    if (!lastTopic) {
        throw new AppError("Không tìm thấy chủ đề nào.", 200);
    }
    if (!isInVoteTime(lastTopic)) {
        throw new AppError("Thời gian chử đề còn thời gian !", 200);
    };
    console.log("toprank", ranklike, rankcomment, rankvote)
    const ID_Topic = lastTopic._id;
    const response = await axios.get(`http://submission-service:3005/api/submission/FindsubmissionTopic/${ID_Topic}`);
    const submissions = response.data?.data || [];
    const submissionsWithUser = await Promise.all(
        submissions.map(async (post) => {
            try {
                // Lấy thông tin người dùng
                const userRes = await axios.get(`http://user-service:3003/api/user/findID/${post.user_id}`);
                const user = userRes.data?.data;

                // Lấy tổng số like
                const likesRes = await axios.get(`http://interaction-service:3006/api/interaction/submissions/${post._id}/likes`);
                const totalLikes = likesRes.data.sumlike || 0;

                // Lấy tổng số comment
                const response = await axios.get(`http://interaction-service:3006/api/interaction/submissions/${post._id}/comments`);
                const totalComments = response.data?.data?.total || 0;
                // Lấy tổng số vote
                const votesRes = await axios.get(`http://interaction-service:3006/api/interaction/votesubmissions/${post._id}`);
                const totalVotes = votesRes.data.sumvote || 0;
                return {
                    ...post,
                    user_name: user?.name || "Unknown",
                    avatar: user?.image || null,
                    like: totalLikes,
                    comment: totalComments,
                    vote: totalVotes,
                };
            } catch (userErr) {
                return {
                    ...post,
                    user_name: "Unknown",
                    avatar: null,
                    like: 0,
                    comment: 0,
                    vote: 0,
                };
            }
        }))
    const userScores = {};

    submissionsWithUser.forEach(sub => {
        const userId = sub.user_id;
        const score = sub.like * ranklike + sub.comment * rankcomment + sub.vote * rankvote;

        if (!userScores[userId]) {
            userScores[userId] = {
                topic_id: sub.topic_id,
                user_id: userId,
                name: sub.user_name,
                avatar: sub.avatar,
                score: 0,
                submission_id: sub._id,
                submitted_at: sub.submitted_at
            };
        }

        userScores[userId].score += score;
    });

    const topUsers = Object.values(userScores)
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score; // điểm cao đứng trước
            } else {
                // Nếu bằng điểm → ai đăng trước thì đứng trước
                return new Date(a.submitted_at) - new Date(b.submitted_at);
            }
        })

        .slice(0, 3);

    for (const sub of topUsers) {
        const existed = await topranking.findOne({
            submission_id: sub.submission_id,
            user_id: sub.user_id,
            topic_id: sub.topic_id
        });

        if (!existed) {
            await handleposttopranking(sub.user_id, sub.submission_id, sub.score, sub.topic_id);

            try {
                const userScore = await userScoreModel.findOne({ user_id: sub.user_id });

                if (userScore) {
                    await userScoreModel.findOneAndUpdate(
                        { user_id: sub.user_id },
                        { $inc: { totalScore: sub.score } }
                    );
                } else {
                    await userScoreModel.create({
                        user_id: sub.user_id,
                        totalScore: sub.score
                    });
                }
            } catch (err) {
                throw new AppError(err.message, 200);
            }
        }
    }
    return topUsers;
};

const getLastTopic = async () => {
    const response = await axios.get("http://topic-service:3004/api/topic");
    return response.data?.data;
};

const handleposttopranking = async (user_id, submission_id, total_score, topic_id) => {
    const newtopranking = await topranking.create({
        user_id,
        submission_id,
        total_score,
        topic_id
    })
    return newtopranking;
};
const isInVoteTime = (topic) => {
    const now = Date.now();
    const end = new Date(topic.end_time).getTime();
    return now == end || now > end;
};

const getTopranking = async (submission_id) => {
    return await topranking.findOne({ submission_id });
};
const deleteSubTopranking = async (submission_id) => {
    return await topranking.deleteOne({ submission_id });
};
const getToprankingTopic = async (topic_id) => {
    return await topranking.find({ topic_id }).lean();
};
const handeFindTopic_sub = async (topic_id) => {
  try {
    const response = await axios.get(`http://submission-service:3005/api/submission/FindsubmissionTopic/${topic_id}`);
    const submissions = response.data?.data || [];

    const submissionsWithTopranking = await Promise.all(
      submissions.map(async (post) => {
        const toprankings = await getTopranking(post._id);
        if (toprankings) {
          return {
            submission: post,
            topranking: toprankings
          };
        } else {
          return null; 
        }
      })
    );
    return submissionsWithTopranking.filter(item => item != null); 
  } catch (err) {
    console.error("Lỗi khi lấy topic_sub:", err);
    return [];
  }
};
const handesumtotal_score = async (topic_id) => {
  try {
    const result = await topranking.aggregate([
      { $match: { topic_id } },
      { $group: { _id: null, total: { $sum: "$total_score" } } }
    ]);

    return result[0]?.total || 0;

  } catch (error) {
    return 0;
  }
};
const handeTopranking_New = async () => {
    try {
        const lastTopic = await getLastTopic();
        const response = await getToprankingTopic(lastTopic._id);
        const submissions = response || [];

        const submissionsWithTopranking = await Promise.all(
            submissions.map(async (post) => {
                try {
                    const userRes = await axios.get(`http://user-service:3003/api/user/findID/${post.user_id}`);
                    const user = userRes.data?.data;
                    if (user) {
                        return {
                            ...post,
                            user_name: user?.name || "Unknown",
                            avatar: user?.image || null,

                        };
                    }
                } catch (err) {
                    return {
                        ...post,
                        user_name: "Unknown",
                        avatar: null,
                    };
                }
            })
        );

        return submissionsWithTopranking;
    } catch (err) {
        return [];
    }
};

module.exports = { handesumtotal_score,getToprankingTopic, handletopranking, handeFindTopic_sub, handeTopranking_New, deleteSubTopranking }