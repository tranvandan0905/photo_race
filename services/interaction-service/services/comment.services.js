const comment = require('../models/comment.model');
module.exports = {
    handeGetcomment: async (submission_id) => {

        if (!submission_id) {
            throw new Error("Không tìm thấy ID bài viết")
        }
        const data = await comment.find({ submission_id });
        if (!data) {
            throw new Error("Không có comment nào !");
        }
        return data;
    },
    handePostcomment: async (submission_id, content, user_id) => {

        if (!submission_id || !content || !user_id) {
            throw new Error("Thiếu dữ liệu!");
        }
        const data = await comment.create({ submission_id, content, user_id });

        return data;
    },
    handeDeletecomment: async (_id) => {
        if (!_id) {
            throw new Error("Thiếu ID!");
        }
        const data = await comment.findByIdAndDelete(_id);
        if (!data) throw new Error("Topic không tồn tại!");
        return data;
    },
    handePatchcomment: async (content, _id) => {
        if (!content || content.trim() === "") {
            throw new Error("Nội dung comment không được để trống!")

        }
        const result = await comment.updateOne({ _id }, { content });
        if (result.matchedCount === 0) {
            throw new Error("Không tìm thấy comment để cập nhật!");
        }    
        return result;

    }

}