const { handelogin } = require("../services/auth.service");

const loginPages = async (req, res) => {
    try {
        const { name, password } = req.body;
        const result = await handelogin(name, password); 
        res.json({ 
            message: "Đăng nhập thành công!", 
            token: result.token 
        });
    
    } catch (error) {
        res.status(500).json({
            message: "Đăng nhập thất bại!",
            error: error.message
        });
    }
};

module.exports = { loginPages };

