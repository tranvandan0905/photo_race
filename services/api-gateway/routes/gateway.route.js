const express = require("express");
const routeAPI = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const authenticateToken = require('../controllers/middleware.getway');
const {postsubmission,getsubmission} = require('../controllers/submission.getway');
const {  getTopic,postTopic,updateTopic, deleteTopic, findTopic}=require("../controllers/topic.getway");
const {  getUser,findUser,deleteUser, updateUser,findUserById,patchVoteXu, postUser, findNameUser, updateAvataUser } = require("../controllers/user.gateway");
const { findcheckvoteTopicUser, postVoteTopic, deleteVoteTopic, getcomment, postcomment, deletecomment, patchcomment, getsumlike, postlike, deletelike, findlike, getsumVoteSubmission, postVoteSubmission, deleteVoteSubmission } = require("../controllers/interaction.getway");
const { login } = require("../controllers/auth.getway");
// Submission 
routeAPI.post('/submission',authenticateToken,upload.single("file"),postsubmission);
routeAPI.get('/submission',getsubmission);
// Auth
routeAPI.post('/login',login);
// Topic 
routeAPI.get('/topic',getTopic);
routeAPI.post('/topic',postTopic);
routeAPI.delete('/topic/:id',deleteTopic);
routeAPI.put('/topic/:id',updateTopic)
routeAPI.get('/topic/find', findTopic);
// User
routeAPI.get('/user',getUser);
routeAPI.post('/user',postUser);
routeAPI.delete('/user/:id', deleteUser);
routeAPI.put('/user',authenticateToken,updateUser);
routeAPI.put('/user/Avata',authenticateToken,upload.single("file"),updateAvataUser);
routeAPI.get('/user/findID',authenticateToken, findUserById);
routeAPI.get('/user/find', findUser);
routeAPI.get('/user/find/name', findNameUser);
routeAPI.patch('/user/vote/:id', patchVoteXu);
// interaction 
// VoteTopic
routeAPI.get('/votetopics/user/:id', findcheckvoteTopicUser);
routeAPI.post('/votetopics',authenticateToken, postVoteTopic);
routeAPI.delete('/votetopics/:topic_id/:user_id', deleteVoteTopic);

// Comments
routeAPI.get('/submissions/:id/comments', getcomment);
routeAPI.post('/comments', postcomment);
routeAPI.delete('/comments/:id', deletecomment);
routeAPI.patch('/comments/:id', patchcomment);

// Likes
routeAPI.get('/submissions/:id/likes', getsumlike);
routeAPI.post('/likes', postlike);
routeAPI.delete('/likes/:submission_id/:user_id', deletelike);
routeAPI.get('/likes/check', findlike);
// Vote Submission
routeAPI.get('/votesubmissions/:id',getsumVoteSubmission );
routeAPI.post('/votesubmissions', postVoteSubmission);
routeAPI.delete('/votesubmissions/:submission_id/:user_id', deleteVoteSubmission);
module.exports = routeAPI;


