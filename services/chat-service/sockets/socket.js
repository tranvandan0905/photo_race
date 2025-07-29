const jwt = require("jsonwebtoken");

const onlineUsers = {};

module.exports = (io) => {
  // Middleware xác thực
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Không có token"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Token không hợp lệ"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user.id;
    onlineUsers[userId] = socket.id;
    console.log(`${userId} đã kết nối`);

    socket.on("sendMessage", ({ receiverId, text, conversationId }) => {
      const senderId = socket.user.id;

      const newMsg = {
        senderId,
        receiverId,
        text,
        conversationId,
        createdAt: Date.now(),
      };

      const receiverSocketId = onlineUsers[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", newMsg);
      }

      socket.emit("receiveMessage", newMsg);
    });

    socket.on("disconnect", () => {
      console.log(`${userId} đã ngắt`);
      delete onlineUsers[userId];
    });
  });
};
