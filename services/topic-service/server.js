require('dotenv').config()
const express= require('express');
const connection=require('./config/db');
const routeAPI=require("./routes/topic.routes");
const errorMiddleware = require('./middlewares/error.middleware');
const app=express();
app.use(express.json());
(async () => {
    try {
        await connection();
    }
    catch (error) {
        console.log(">> error", error)
    }
})()
app.use('/api/topic',routeAPI);
app.use(errorMiddleware);
app.listen(3004,()=>{
    console.log(" ket not thanh cong ");
})
