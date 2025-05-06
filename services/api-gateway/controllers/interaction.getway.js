const axios = require('axios');

module.exports = {
    getcomment: async (req, res) => {
        try {
          const submission_id = req.params.id;
          const response = await axios.get(`http://interaction-service:3006/api/interaction/submissions/${submission_id}/comments`);
          const comments = response.data?.data || [];
      
          const commentsWithUser = await Promise.all(
            comments.map(async (comment) => {
              try {
                const userRes = await axios.get(`http://user-service:3003/api/user/findID/${comment.user_id}`);
                const user = userRes.data?.data;
                return {
                  ...comment,
                  user_name: user?.name || "Unknown",
                  avatar: user?.avatar || null,
                };
              } catch (userErr) {
                return {
                  ...comment,
                  user_name: "Unknown",
                  avatar: null,
                };
              }
            })
          );
      
          return res.status(200).json({
            errorCode: 0,
            data: commentsWithUser,
            message: "Lấy danh sách bình luận kèm thông tin user thành công!",
          });
        } catch (error) {
          return res.status(500).json({
            message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!",
          });
        }
      },
         
    postcomment: async (req, res) => {
        try {
            const response = await axios.post(`http://interaction-service:3006/api/interaction/comments`, req.body);
            return res.status(200).json({ data: response.data.data });
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    deletecomment: async (req, res) => {
        try {
            const _id = req.params.id;
            const response = await axios.delete(`http://interaction-service:3006/api/interaction/comments/${_id}`);
            return res.status(200).json({ data: response.data });
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    patchcomment: async (req, res) => {
        try {
            const _id = req.params.id;
            const response = await axios.patch(`http://interaction-service:3006/api/interaction/comments/${_id}`, { content: req.body.content });
            return res.status(200).json({ data: response.data });
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    findcheckvoteTopicUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const response = await axios.get(`http://interaction-service:3006/api/interaction/votetopics/user/${userId}`);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    postVoteTopic: async (req, res) => {
        try {
            const { topic_id, user_id } = req.body;
            const response = await axios.post('http://interaction-service:3006/api/interaction/votetopics', { topic_id, user_id });
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    deleteVoteTopic: async (req, res) => {
        try {
            const { topic_id, user_id } = req.params;
            const response = await axios.delete(`http://interaction-service:3006/api/interaction/votetopics/${topic_id}/${user_id}`);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    getsumlike: async (req, res) => {
        try {
            const submissionId = req.params.id;
            const response = await axios.get(`http://interaction-service:3006/api/interaction/submissions/${submissionId}/likes`);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    postlike: async (req, res) => {
        try {
            const { submission_id, user_id } = req.body;
            const response = await axios.post('http://interaction-service:3006/api/interaction/likes', { submission_id, user_id });
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    deletelike: async (req, res) => {
        try {
            const { submission_id, user_id } = req.params;
            const response = await axios.delete(`http://interaction-service:3006/api/interaction/likes/${submission_id}/${user_id}`);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },

    findlike: async (req, res) => {
        try {
            const { submission_id, user_id } = req.query;
            const response = await axios.get(`http://interaction-service:3006/api/interaction/likes/check?submission_id=${submission_id}&user_id=${user_id}`);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },
    postVoteSubmission: async (req, res) => {
        try {
            const { submission_id, user_id } = req.body;
            const response = await axios.post('http://interaction-service:3006/api/interaction/votesubmissions', { submission_id, user_id });
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }

    },
    deleteVoteSubmission: async (req, res) => {
        try {
            const { submission_id, user_id } = req.params;
            const response = await axios.delete(`http://interaction-service:3006/api/interaction/votesubmissions/${submission_id}/${user_id}`);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },
    getsumVoteSubmission: async (req, res) => {
        try {
            const submission_id = req.params.id;
            const response = await axios.get(`http://interaction-service:3006/api/interaction/votesubmissions/${submission_id}`);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    },
}
