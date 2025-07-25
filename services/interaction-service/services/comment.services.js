const comment = require('../models/comment.model');
module.exports = {
    handeGetcomment: async (submission_id) => {
      

        const comments = await comment.find({ submission_id });
        const totalComments = await comment.countDocuments({ submission_id });

        return {
            data: comments,
            total: totalComments
        };
    },

    handleGetSumcomment: async (submission_id) => {
     
        const totalLikes = await comment.countDocuments({ submission_id });
        return totalLikes;
    },
    handePostcomment: async (submission_id, content, user_id) => {
 
        const result = await comment.findOne({ submission_id, user_id });
        if (result) throw new Error("Bạn đã comment!");
        const data = await comment.create({ submission_id, content: content.trim(), user_id });
        return data;
    },

    handeDeletecomment: async (_id, user_id) => {
        if (!_id || !user_id) throw new Error("Thiếu ID!");

        const result = await comment.findById(_id);
         console.log(_id,"data",result,"ID user",user_id);
        if (!result) throw new Error("Comment không tồn tại!");
        if (!result.user_id || result.user_id.toString() !== user_id.toString()) {
            throw new Error("Không phải chủ sở hữu !");
        }

        const data = await comment.findByIdAndDelete(_id);
        return data;
    },

    handePatchcomment: async (content, _id) => {
        if (!content || content.trim() === "") {
            throw new Error("Nội dung comment không được để trống!");
        }
        const data = await comment.findByIdAndUpdate(_id, { content: content.trim() }, { new: true });
        if (!data) throw new Error("Không tìm thấy comment để cập nhật!");
        return data;
    },
     deleteCmtMany : async (submission_id) => {
      return await comment.deleteMany({ submission_id });
    }
}
