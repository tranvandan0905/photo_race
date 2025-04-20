const express = require("express");
const app = express();
require("dotenv").config();
const cloudinaryRoutes = require("./routes/cloudinary.route");
app.use(express.json());
app.use("/api/media", cloudinaryRoutes); 
app.listen(5000, () => {
  console.log(`Chạy server thành công !`);
});
