const comment = require('../models/comment.model');
module.exports = {
    handeGetcomment: async (submission_id) => {
        if (!submission_id) throw new Error("Không tìm thấy ID bài viết");

        const comments = await comment.find({ submission_id });
        const totalComments = await comment.countDocuments({ submission_id });

        return {
            data: comments,
            total: totalComments
        };
    },

    handleGetSumcomment: async (submission_id) => {
        if (!submission_id) {
            throw new Error("Không tìm thấy ID bài viết");
        }
        const totalLikes = await comment.countDocuments({ submission_id });
        return totalLikes;
    },
    handePostcomment: async (submission_id, content, user_id) => {
        if (!submission_id || !content || !user_id) {
            throw new Error("Thiếu dữ liệu!");
        }
        const result = await comment.findOne({ submission_id, user_id });
        if (result) throw new Error("Bạn đã comment!");
        const data = await comment.create({ submission_id, content: content.trim(), user_id });
        return data;
    },

    handeDeletecomment: async (_id) => {
        if (!_id) throw new Error("Thiếu ID!");
        const data = await comment.findByIdAndDelete(_id);
        if (!data) throw new Error("Comment không tồn tại!");
        return data;
    },

    handePatchcomment: async (content, _id) => {
        if (!content || content.trim() === "") {
            throw new Error("Nội dung comment không được để trống!");
        }
        const data = await comment.findByIdAndUpdate(_id, { content: content.trim() }, { new: true });
        if (!data) throw new Error("Không tìm thấy comment để cập nhật!");
        return data;
    }
}
