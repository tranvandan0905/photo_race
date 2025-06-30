const { handeDeleteAdvertiser,handecreateAdvertiser,handeGetAdvertiser } = require("../services/ad.services");
const PostAdvertiser = async (req, res) => {
  try {
    const data = req.body;
    const { name, email, phone, company_name } = data;

    if (!name || !email || !phone || !company_name) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    const advertiser = await handecreateAdvertiser(data);
    return res.status(200).json({
      data: advertiser,
      message: "Thêm Advertiser thành công!"
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Có lỗi xảy ra!'
    });
  }
};
 const DeleteAdvertiser= async(req,res)=>{
        try {
            const _id=req.params.id;
            const result=handeDeleteAdvertiser(_id);
            return res.status(200).json({
                data:result,
                message:"Xóa Advertiser thành công!"
            });
        } catch (error) {
              return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })
        }
};
const   getAdvertiser= async (req, res) => {
        try {
            const data = await handeGetAdvertiser();
            return res.status(200).json({
                data: data,
                message: "Lấy Advertiser thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Có lỗi xảy ra!'
            })
        }
    }
module.exports = { PostAdvertiser,DeleteAdvertiser,getAdvertiser };
