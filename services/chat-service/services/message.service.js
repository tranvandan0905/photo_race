const Message = require("../models/message.model");
const { updateLastMessage } = require("./conversation.service");

const handecreateMessage = async (conversationId, senderId, text) => {
  const message = new Message({
    conversationId,
    senderId,
    text,
  });

  const [savedMessage, _] = await Promise.all([
    message.save(),
    updateLastMessage(conversationId, text)
  ]);

  return savedMessage;
};

const handegetMessagesByConversation = async (conversationId) => {
   return await Message.find({ conversationId }).sort({ createdAt: 1 });
};
module.exports = { handecreateMessage,handegetMessagesByConversation };

