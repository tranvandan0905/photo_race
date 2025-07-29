const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const connection = require("./config/db");
const routesAPI = require("./routes/chat.route");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());
app.use(require("cors")());

app.use("/api/chat", routesAPI);
app.use(errorMiddleware);

// Tạo HTTP server & Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Tách phần socket vào file riêng
require("./sockets/socket")(io);

// Kết nối DB
(async () => {
  try {
    await connection();
    console.log(" Đã kết nối MongoDB");
  } catch (err) {
    console.error(" MongoDB lỗi:", err);
  }
})();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(` Server chat đang chạy tại cổng ${PORT}`);
});
