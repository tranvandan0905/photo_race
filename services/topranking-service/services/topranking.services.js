const topranking = require("../models/topranking.model");
const axios = require('axios');
const handletopranking = async () => {
    const lastTopic = await getLastTopic();
    if (!lastTopic) {
        throw new Error("Không tìm thấy chủ đề nào.");
    }
    if (!isInVoteTime(lastTopic)) {
        throw new Error("Thời gian chử đề còn thời gian !");
    }
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
                // Nếu có lỗi khi lấy thông tin user, trả về thông tin mặc định
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
        const score = sub.like * 1 + sub.comment * 2 + sub.vote * 5;

        if (!userScores[userId]) {
            userScores[userId] = {
                user_id: userId,
                name: sub.user_name,
                avatar: sub.avatar,
                score: 0,
                submission_id: sub._id
            };
        }

        userScores[userId].score += score;
    });

    const topUsers = Object.values(userScores)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    for (const sub of topUsers) {
        const existed = await topranking.findOne({
            submission_id: sub.submission_id,
            user_id: sub.user_id
        });
        if (!existed) {
            await handleposttopranking(sub.user_id, sub.submission_id, sub.score);
        }
    }


    return topUsers;
};

const getLastTopic = async () => {
    const response = await axios.get("http://topic-service:3004/api/topic");
    return response.data?.data?.at(-1);
};

const handleposttopranking = async (user_id, submission_id, total_score) => {
    const newtopranking = await topranking.create({
        user_id,
        submission_id,
        total_score
    })
    return newtopranking;
};
const isInVoteTime = (topic) => {
    const now = Date.now();
    const end = new Date(topic.end_time).getTime();
    return now == end || now > end;
};
const handleSumTopRanking = async () => {
    const result = await topranking.aggregate([
        {
            $group: {
                _id: "$user_id", // gom nhóm theo user_id
                totalScore: { $sum: "$total_score" } // cộng tổng total_score của mỗi user
            }
        },
        {
            $sort: { totalScore: -1 } // nếu bạn muốn sắp xếp từ cao xuống
        }
    ])
    const Toprank = await Promise.all(
        result.map(async (post) => {
            try {
                // Lấy thông tin người dùng
                const userRes = await axios.get(`http://user-service:3003/api/user/findID/${post._id}`);
                const user = userRes.data?.data;
                return {
                    ...post,
                    user_name: user?.name || "Unknown",
                    avatar: user?.image || null,
                };
            } catch (userErr) {
                // Nếu có lỗi khi lấy thông tin user, trả về thông tin mặc định
                return {
                    ...post,
                    user_name: "Unknown",
                    avatar: null,
                };
            }
        }))
    return Toprank;
};
const getTopranking = async (submission_id) => {
    // Trả về danh sách các bản ghi topranking theo submission_id
    return await topranking.findOne({ submission_id });
};

const handeFindTopic_sub = async (topic_id) => {
    try {
        const response = await axios.get(`http://submission-service:3005/api/submission/FindsubmissionTopic/${topic_id}`);
        const submissions = response.data?.data || [];

        const submissionsWithTopranking = await Promise.all(
            submissions.map(async (post) => {
                try {
                    const toprankings = await getTopranking(post._id);
                    if (toprankings) {
                        return {
                            submission: post,
                            topranking: toprankings
                        };
                    }
                } catch (err) {
                    return {
                        submission: post,
                        topranking: []
                    };
                }
            })
        );

        return submissionsWithTopranking;
    } catch (err) {
        return [];
    }
};
const handeTopranking_New = async (topic_id) => {
    try {
        const lastTopic = await getLastTopic();
        const response = await axios.get(`http://submission-service:3005/api/submission/FindsubmissionTopic/${lastTopic.topic_id}`);
        const submissions = response.data?.data || [];

        const submissionsWithTopranking = await Promise.all(
            submissions.map(async (post) => {
                try {
                    const toprankings = await getTopranking(post._id);
                    if (toprankings) {
                        return {
                            submission: post,
                            topranking: toprankings
                        };
                    }
                } catch (err) {
                    return {
                        submission: post,
                        topranking: []
                    };
                }
            })
        );

        return submissionsWithTopranking;
    } catch (err) {
        return [];
    }
};

module.exports = { handletopranking, handleSumTopRanking, handeFindTopic_sub ,handeTopranking_New} 