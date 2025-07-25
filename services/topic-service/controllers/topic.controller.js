
const { handeGetTopic, handeUpdateTopic, handePostTopic,handeDeleteTopic,handeFindTopic } = require("../services/topic.services");
const { success } = require("../utils/response.util");

module.exports = {
    gettopic: async (req, res,next) => {
        try {
            const data = await handeGetTopic();
            return res.status(200).json(success( data,"Lấy topic thành công!"));
        } catch (error) {
            next(error);
        }
    },
    posttopic: async (req, res,next) => {
        try {
            const data = req.body;
            const topic = await handePostTopic(data);
            return res.status(200).json(success( topic,"Thêm topic thành công!"));
        } catch (error) {
               next(error);
        }
    },
    updatatopic: async (req, res,next) => {
        try {
            const data = req.body;
            const _id = req.params.id;
            const result = handeUpdateTopic(_id, data);
            return res.status(200).json(success( result,"Update Topic thành công!"));
        } catch (error) {
              next(error);
        }
    },
    deletedtopic: async(req,res,next)=>{
        try {
            const _id=req.params.id;
            const result=handeDeleteTopic(_id);
            return res.status(200).json(success(result,"Xóa Topic thành công!"));
        } catch (error) {
                next(error);
        }
    },
    findTopic: async (req, res,next) => {
        try {
          const  title  = req.query;
          const topic = await handeFindTopic( title );
          return res.status(200).json(success(topic,"Tim thay Topic thành công!"));
        } catch (error) {
            next(error);
        }
      },
    
}