require('dotenv').config()
const express= require('express');
const connection=require('./config/db');
const routeAPI=require("./routes/topranking.routes");
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
app.use('/api/topranking',routeAPI);
app.listen(3007,()=>{
    console.log(" ket not thanh cong ");
})
