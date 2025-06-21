const { handletopranking, handleSumTopRanking } = require("../services/topranking.services");

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

module.exports={topranking,sumtopranking}