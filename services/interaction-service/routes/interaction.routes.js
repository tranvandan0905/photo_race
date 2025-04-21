const express = require("express");
const { findvoteTopicUser, postvotetopic } = require("../controllers/voteTopic.controller");
const routeAPI=express.Router();
routeAPI.get('/votetopic/findvote/:id',findvoteTopicUser);
routeAPI.post('/votetopic',postvotetopic);
module.exports=routeAPI;