const { handletopranking } = require("../services/topranking.services");

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
module.exports={topranking}