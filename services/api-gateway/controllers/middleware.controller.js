const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Không tìm thấy token!" });
    }

    jwt.verify(token,"your_secret_key_here", (err, user) => {
        if (err) return res.status(403).json({ message: "Token không hợp lệ!" });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
