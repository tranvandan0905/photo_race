const { handelogin, handeloginaAds } = require("../services/auth.service");

const loginPages = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await handelogin(email, password); 
        res.json({ 
            message: "Đăng nhập thành công!", 
            token: result.token,
            role: result.role
        });
    
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Đăng nhập thất bại!',
        });
    }
};
const loginAds = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await handeloginaAds(email, password); 
        res.json({ 
            message: "Đăng nhập thành công!", 
            token: result.token ,
        
        });
    
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Đăng nhập thất bại!',
        });
    }
};
module.exports = { loginPages,loginAds };

