const express = require("express");
const routeAPI=express.Router();
const { topranking, sumtopranking, FindTopic_sub, Topranking_New, deleteSub }=require("../controllers/topranking.controller");
routeAPI.get('/',topranking);
routeAPI.get('/toprank',sumtopranking);
routeAPI.get('/topranking-topic/:topic_id', FindTopic_sub);
routeAPI.get('/new-user-topranking',Topranking_New);
routeAPI.delete('/:submission_id',deleteSub);
module.exports=routeAPI;