const express = require("express");
const { findvoteTopicUser, postvotetopic } = require("../controllers/voteTopic.controller");
const { getcomment, deletecomment,postcomment, patchcomment} = require("../controllers/comment.controller");
const routeAPI=express.Router();
// vote topic 
routeAPI.get('/votetopic/findvote/:id',findvoteTopicUser);
routeAPI.post('/votetopic',postvotetopic);
// comment 
routeAPI.get('/submission/:id/comments', getcomment);
routeAPI.delete('/comment/:id',deletecomment);
routeAPI.post('/comment',postcomment);
routeAPI.patch('/comment/:id',patchcomment);
module.exports=routeAPI;