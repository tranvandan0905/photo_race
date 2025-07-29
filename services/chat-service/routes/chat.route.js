const express = require("express");
const { getMessages, sendMessage } = require("../controllers/message.controller");
const { createOrGetConversation, GetConversation, updateLastConversation } = require("../controllers/conversation.controller");
const { authenticateToken } = require("../middlewares/middlewares");
const routesAPI = express.Router();
routesAPI.get("/messages/:conversationId",authenticateToken,getMessages)
routesAPI.post("/messages",authenticateToken,sendMessage)

routesAPI.get("/conversation/",authenticateToken,GetConversation)
routesAPI.post("/conversation",createOrGetConversation)
routesAPI.put("/conversation/:id",authenticateToken,updateLastConversation)
module.exports = routesAPI;
