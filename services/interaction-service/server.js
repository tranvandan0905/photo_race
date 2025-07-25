require('dotenv').config()
const express= require('express');
const app=express();
const connection=require('./config/db');
const post=process.env.POST;
app.use(express.json());
const routeAPI=require("./routes/interaction.routes");
const errorMiddleware = require('./middlewares/error.middleware');
app.use('/api/interaction',routeAPI);
(async () => {
    try {
        await connection();
    }
    catch (error) {
        console.log(">> error", error)
    }
})()
app.use(errorMiddleware);
app.listen(post,()=>{
    console.log(" ket not thanh cong ");
})
