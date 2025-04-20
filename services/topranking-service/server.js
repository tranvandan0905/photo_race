require('dotenv').config()
const express= require('express');
const app=express();
const connection=require('./config/db');
app.get('/',(req,res)=>{
    res.send("oh");
});
(async () => {
    try {
        await connection();
    }
    catch (error) {
        console.log(">> error", error)
    }
})()
app.listen(3007,()=>{
    console.log(" ket not thanh cong ");
})