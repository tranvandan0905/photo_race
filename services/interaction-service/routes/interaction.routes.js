const express = require("express");
const { findcheckvoteTopicUser, postVoteTopic } = require("../controllers/voteTopic.controller");
const { getcomment, deletecomment,postcomment, patchcomment} = require("../controllers/comment.controller");
const { findlike } = require("../controllers/like.controller");
const routeAPI=express.Router();
// vote topic 
routeAPI.get('/votetopic/findvote/:id',findcheckvoteTopicUser);
routeAPI.post('/votetopic',postVoteTopic);
// comment 
routeAPI.get('/submission/:id/comments', getcomment);
routeAPI.delete('/comment/:id',deletecomment);
routeAPI.post('/comment',postcomment);
routeAPI.patch('/comment/:id',patchcomment);
// like 
routeAPI.get('/submission/:id/like', getcomment);
routeAPI.delete('/like/:id',deletecomment);
routeAPI.post('/like',postcomment);
routeAPI.get('/findlike',findlike);

module.exports=routeAPI;