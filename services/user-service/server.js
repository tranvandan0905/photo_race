require('dotenv').config()
const express= require('express');
const connection=require('./config/db');
const routeAPI=require('./routes/user.routes');
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
app.use('/api/user',routeAPI);
app.use(errorMiddleware);
app.listen(3003,()=>{
    console.log(" ket not thanh cong ");
})