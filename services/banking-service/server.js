require('dotenv').config()
const express= require('express');
const connection=require('./config/db');
const routeAPI=require("./routes/banking.routes");
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
app.use('/api/banking',routeAPI);
app.listen(3010,()=>{
    console.log(" ket not thanh cong ");
})
