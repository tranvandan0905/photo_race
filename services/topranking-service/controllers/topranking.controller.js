const { handletopranking, handleSumTopRanking,handeFindTopic_sub, handeTopranking_New } = require("../services/topranking.services");

const topranking =async(req,res)=>{
try {
    const data= await handletopranking(); 
     return res.status(200).json({
                data: data,
                message: "Xét topranking thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })                              
        }
}
const sumtopranking =async(req,res)=>{
try {
    const data= await handleSumTopRanking(); 
     return res.status(200).json({
                data: data,
                message: "Lấy topranking thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })                              
        }
}
const FindTopic_sub =async(req,res)=>{
try {
     const { topic_id } = req.params;
    const data= await handeFindTopic_sub(topic_id); 
     return res.status(200).json({
                data: data,
                message: "Lấy topranking thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })                              
        }
}
const Topranking_New =async(req,res)=>{
try {
     
    const data= await handeTopranking_New(); 
     return res.status(200).json({
                data: data,
                message: "Lấy topranking thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })                              
        }
}

module.exports={topranking,sumtopranking,FindTopic_sub,Topranking_New}