
const { handeGetcomment, handePostcomment, handePatchcomment, handeDeletecomment , handleGetSumcomment} = require('../services/comment.services');
module.exports = {
    getcomment: async (req, res) => {
        try {
            const submission_id = req.params.id;
            const data = await handeGetcomment(submission_id);
          
            return res.status(200).json({
                data: data,
               
            });
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    postcomment: async (req, res) => {
        try {
            const {submission_id,content,user_id} =req.body;
            const data = await handePostcomment(submission_id,content,user_id);
            return res.status(200).json({
                data: data,
                message: "Thêm comment thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    deletecomment: async (req, res) => {
        try {
            const _id = req.params.id;
            const data = await handeDeletecomment(_id);
            return res.status(200).json({
                data: data,
                message: "Xóa comment thành công!",
            });
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    patchcomment: async (req, res) => {
        try {
            const  content  = req.body.content;
            const _id = req.params.id;

    
            const result = await handePatchcomment(content,_id);
            return res.status(200).json({
                data: result,
                message: "Cập nhật comment thành công!",
            });
    
        } catch (error) {
            return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    }
    
}