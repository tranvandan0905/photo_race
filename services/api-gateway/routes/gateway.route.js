const express = require("express");
const routeAPI = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const authenticateToken = require('../controllers/middleware.getway');
const {postsubmission,getsubmission} = require('../controllers/submission.getway');
const {  getTopic,postTopic,updateTopic, deleteTopic, findTopic}=require("../controllers/topic.getway");
const {  getUser,findUser,deleteUser, updateUser,findUserById,patchVoteXu, postUser, findNameUser, updateAvataUser } = require("../controllers/user.gateway");
const { findcheckvoteTopicUser, postVoteTopic, deleteVoteTopic, getcomment, postcomment, deletecomment, patchcomment, getsumlike, postlike, deletelike, findlike, postVoteSubmission, deleteVoteSubmission, findVoteSub } = require("../controllers/interaction.getway");
const { login, register } = require("../controllers/auth.getway");
const { topranking, sumtopranking } = require("../controllers/topranking.gatway");
// Submission 
routeAPI.post('/submission',authenticateToken,upload.single("file"),postsubmission);
routeAPI.get('/submission',getsubmission);
// Auth
routeAPI.post('/login',login);
routeAPI.post('/register',register);
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
routeAPI.post('/comments',authenticateToken,postcomment);
routeAPI.delete('/comments/:id', deletecomment);
routeAPI.patch('/comments/:id', patchcomment);

// Likes
routeAPI.get('/submissions/:id/likes', getsumlike);
routeAPI.post('/likes',authenticateToken, postlike);
routeAPI.delete('/likes/:submission_id',authenticateToken, deletelike);
routeAPI.get('/likes/check/:submission_id',authenticateToken, findlike);
// Vote Submission
routeAPI.post('/votesubmissions',authenticateToken, postVoteSubmission);
routeAPI.delete('/votesubmissions/:submission_id',authenticateToken, deleteVoteSubmission);
routeAPI.get('/votesubmissions/check/:submission_id',authenticateToken, findVoteSub);
//Topranking
routeAPI.get('/topranking',topranking);
routeAPI.get('/topranking/toprank',sumtopranking);

module.exports = routeAPI;


