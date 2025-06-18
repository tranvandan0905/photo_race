const express =require("express");
const { getsubmission,postsubmission, FindsubmissionTopic, deletesubmission, FindsubTopic } = require("../controllers/submission.controller");
const routeAPI=express.Router();
routeAPI.get("/",getsubmission);
routeAPI.post("/",postsubmission);
routeAPI.delete('/:id',deletesubmission);
routeAPI.get('/findIDTopic/:topic_id/:user_id',FindsubmissionTopic);
routeAPI.get('/FindsubmissionTopic/:topic_id',FindsubTopic);
module.exports=routeAPI; 