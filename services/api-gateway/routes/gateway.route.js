const express = require("express");
const routeAPI = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const authenticateToken = require('../controllers/middleware.controller');
const {postsubmission, login } = require('../controllers/gateway.controller');
const {  getTopic,postTopic,updateTopic, deleteTopic, findTopic}=require("../controllers/topic.getway");
const {  getUser,findUser,deleteUser, updateUser,findUserById,patchVoteXu, postUser } = require("../controllers/user.gateway");
// Submission 
routeAPI.post('/submission',authenticateToken,upload.single("file"),postsubmission);
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
routeAPI.put('/user/:id',updateUser);
routeAPI.get('/user/findID/:id', findUserById);
routeAPI.get('/user/find', findUser);
routeAPI.patch('/user/vote/:id', patchVoteXu);
module.exports = routeAPI;


