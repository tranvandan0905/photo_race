
const { handlePostUser, handGetUser, handleDeleteUser, handleUpdateUser,handeFindUser, handleFindIDUser} = require("../services/user.services");
module.exports = {
    getuser: async (req, res) => {
        try {
            const {check} = req.query;
            const data = await handGetUser(check);
            return res.status(200).json({
                errorCode: 0,
                data: data,
                message: "Lấy user thành công!"
            });
        } catch (error) {
            return res.status(400).json({
                errorCode: 1,
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    postuser: async (req, res) => {

        try {
            const { email, name, password } = req.body;
            const userId = req.user._id;
            console.log("okok ",userId);
            const user = await handlePostUser({ email, name, password });
            return res.status(200).json({
                errorCode: 0,
                data: user,
                message: "Thêm thành công!"
            })

        } catch (error) {

            return res.status(400).json({
                errorCode: 1,
                message: error.message || 'Có lỗi xảy ra!',
            });
        }
    },
    deleteduser: async (req, res) => {
        try {
            const _id = req.params.id;
            const result = await handleDeleteUser(_id);
            return res.status(200).json({
                errorCode: 0,
                data: result,
                message: "Xóa user thành công!"
            })

        } catch (error) {
            return res.status(400).json({
                errorCode: 1,
                message: error.message || 'Có lỗi xảy ra!',
            })
        }
    },
    updateuser: async(req,res) =>{
        try {
            const _id=req.params.id;
            const data=req.body;
            const result=await handleUpdateUser(data,_id);
            return res.status(200).json({
                errorCode:0,
                data:result,
                message:"Edit thành công!",
            })
        } catch (error) {
            return res.status(400).json({
                errorCode:1,
                message: error.message || 'Có lỗi xảy ra!',
            })    
        }
    },
    FindIDuser: async (req, res) => {
        try {
          const _id = req.params.id; 
          const result = await handleFindIDUser(_id);
          return res.status(200).json({
            errorCode: 0,
            data: result,
            message: "Tìm kiếm thành công!",
          });
        } catch (error) {
          return res.status(400).json({
            errorCode: 1,
            message: error.message || "Có lỗi xảy ra!",
          });
        }
      },
      findUser: async (req, res) => {
        try {
          const  {name}  = req.query;
          const user = await handeFindUser( name );
          return res.status(200).json({ errorCode: 0, data: user });
        } catch (err) {
          return res.status(400).json({
             errorCode: 1,
              message: err.message  || "Có lỗi xảy ra!",
          });
        }
      }
      
      

}
