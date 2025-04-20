require('dotenv').config()
const express= require('express');
const app=express();
const connection=require('./config/db');
const post=process.env.POST;
app.use(express.json());
// const routeAPI=require("./routes/interaction.routes");
// app.use('/api/interaction',routeAPI);
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
app.listen(post,()=>{
    console.log(" ket not thanh cong ");
})
