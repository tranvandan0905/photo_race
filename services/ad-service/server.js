require('dotenv').config()
const express= require('express');
const connection=require('./config/db');
const routeAPI=require("./routes/ad.routes");
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
app.use('/api/ad',routeAPI);
app.listen(3009,()=>{
    console.log(" ket not thanh cong ");
})
