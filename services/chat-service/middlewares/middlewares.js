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


module.exports = {authenticateToken};
