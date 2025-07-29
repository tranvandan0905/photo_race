const { handecreateMessage, handegetMessagesByConversation } = require("../services/message.service");
const { success } = require("../utils/response.util");

const sendMessage = async (req, res, next) => {
    try {
        const senderId = req.user.id;
        const {conversationId, text } = req.body;
        const message = await handecreateMessage(conversationId, senderId, text);
        res.status(201).json(success(message));
    } catch (err) {
        next(err);
    }
};

const getMessages = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const messages = await handegetMessagesByConversation(conversationId);
        res.status(200).json(success(messages));
    } catch (err) {
        next(err);
    }
};
module.exports = { sendMessage, getMessages } 