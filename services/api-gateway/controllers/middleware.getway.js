const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Vui lòng đăng nhập!" });
    }

    jwt.verify(token,"your_secret_key_here", (err, user) => {
        if (err) return res.status(403).json({ message: "Vui lòng đăng nhập!" });
        req.user = user;
        next();
    });
};
const authenticateTokenAds = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Vui lòng đăng nhập!" });
    }
    jwt.verify(token,"me_secret_key_here", (err, ads) => {
        if (err) return res.status(403).json({ message: "Vui lòng đăng nhập!" });
        req.ads = ads;
        next();
    });
};
const authenticateTokenAdmin = (req, res, next) => {
     const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Vui lòng đăng nhập!" });
    }

    jwt.verify(token,"your_secret_key_here", (err, user) => {
        if (err) return res.status(403).json({ message: "Vui lòng đăng nhập!" });
         if (user.role !== 'admin') {
            return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
        }
        next();
     
    });
};
module.exports = {authenticateToken,authenticateTokenAds,authenticateTokenAdmin};
