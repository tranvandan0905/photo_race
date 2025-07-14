const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const handelogin = async (email, password) => {
    const response = await axios.get("http://user-service:3003/api/user/find", {
        params: { email },
        timeout: 3000
      });      
      console.log("helo",response);
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
        { id: user._id, role: user.role, name: user.name},
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { error: false, token, user };
};
const handeloginaAds = async (email, password) => {
    const response = await axios.get("http://ad-service:3009/api/ad/advertisers/find", {
        params: { email },
        timeout: 3000
      });      
       const ads = response.data?.data;
    if (!ads) {
        throw new Error("Tài khoản của quý khách không tồn tại!");
    }

    const isMatch = await bcrypt.compare(password, ads.password);
    if (!isMatch) {
        throw new Error("Sai mật khẩu!");
    }

    if (!process.env.JWT_SECRET_Ads) {
        throw new Error("Lỗi cấu hình server: JWT_SECRET bị thiếu!");
    }

    const token = jwt.sign(
        { id: ads._id, name: ads.name},
        process.env.JWT_SECRET_Ads,
        { expiresIn: "1d" }
    );

    return { error: false, token, ads };
};
module.exports = { handelogin,handeloginaAds };

