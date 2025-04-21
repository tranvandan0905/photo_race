const express = require("express");
const routeAPI = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const authenticateToken = require('../controllers/middleware.controller');
const { getuser, getopic, findUser, postsubmission, login } = require('../controllers/gateway.controller');
routeAPI.get('/user', getuser);
routeAPI.get('/topic', getopic);
routeAPI.get('/user/find', findUser);
routeAPI.post('/submission',authenticateToken,upload.single("file"),postsubmission);
routeAPI.post('/login',login);
module.exports = routeAPI;


