const express = require("express");
const routeAPI=express.Router();
const {gettopic,posttopic,updatatopic,deletedtopic, findTopic}=require("../controllers/topic.controller");
routeAPI.get('/',gettopic);
routeAPI.post('/',posttopic);
routeAPI.delete('/:id',deletedtopic);
routeAPI.put('/:id',updatatopic)
routeAPI.get('/find', findTopic);
module.exports=routeAPI;