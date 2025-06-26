const express = require("express");
const routeAPI=express.Router();
const { topranking, sumtopranking, FindTopic_sub }=require("../controllers/topranking.controller");
routeAPI.get('/',topranking);
routeAPI.get('/toprank',sumtopranking);
routeAPI.get('/topranking-topic/:topic_id', FindTopic_sub);
module.exports=routeAPI;