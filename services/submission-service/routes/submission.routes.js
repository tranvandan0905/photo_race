const express =require("express");
const { getsubmission,postsubmission, FindsubmissionTopic, deletesubmission } = require("../controllers/submission.controller");
const routeAPI=express.Router();
routeAPI.get("/",getsubmission);
routeAPI.post("/",postsubmission);
routeAPI.delete('/:id',deletesubmission);
routeAPI.get('/findIDTopic/:id',FindsubmissionTopic);
module.exports=routeAPI; 