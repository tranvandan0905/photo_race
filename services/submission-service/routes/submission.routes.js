const express =require("express");
const { getsubmission,postsubmission } = require("../controllers/submission.controller");
const routeAPI=express.Router();
routeAPI.get("/",getsubmission);
routeAPI.post("/",postsubmission);
module.exports=routeAPI;