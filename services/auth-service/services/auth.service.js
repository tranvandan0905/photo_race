const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const handelogin = async (name, password) => {
    const response = await axios.get("http://user-service:3003/api/user/find", {
        params: { name },
        timeout: 3000
      });      
        const user = response.data?.data;
    if (!user) {
        throw new Error("Tài khoản của quý khách không tồn tại!");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error("Sai mật khẩu!");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("Lỗi cấu hình server: JWT_SECRET bị thiếu!");
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { error: false, token, user };
};

module.exports = { handelogin };

