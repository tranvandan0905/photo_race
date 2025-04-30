
const { handeGetTopic, handeUpdateTopic, handePostTopic,handeDeleteTopic,handeFindTopic } = require("../services/topic.services");

module.exports = {
    gettopic: async (req, res) => {
        try {
            const data = await handeGetTopic();
            return res.status(200).json({
                data: data,
                message: "Lấy topic thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })
        }
    },
    posttopic: async (req, res) => {
        try {
            const data = req.body;
            const topic = await handePostTopic(data);
            return res.status(200).json({
                data: topic,
                message: "Thêm topic thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })
        }
    },
    updatatopic: async (req, res) => {
        try {
            const data = req.body;
            const _id = req.params.id;
            const result = handeUpdateTopic(_id, data);
            return res.status(200).json({
                data: result,
                message: "Update Topic thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })
        }
    },
    deletedtopic: async(req,res)=>{
        try {
            const _id=req.params.id;
            const result=handeDeleteTopic(_id);
            return res.status(200).json({
                data:result,
                message:"Xóa Topic thành công!"
            });
        } catch (error) {
              return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })
        }
    },
    findTopic: async (req, res) => {
        try {
          const  title  = req.query;
          const topic = await handeFindTopic( title );
          return res.status(200).json({
             data: topic,
             message:"Tim thay Topic thành công!"
             });
        } catch (error) {
          return res.status(400).json({
              message: error.message  || "Có lỗi xảy ra!",

          });
        }
      },
    
}