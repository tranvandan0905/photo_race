const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const routesAPI  = require("./routes/auth.route");
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", routesAPI); 
app.listen(3008, () => {
  console.log(`Chạy server thành công !`);
});
