const { createOrGet, handleGetConversations, updateLastMessage } = require("../services/conversation.service");
const { success } = require("../utils/response.util");
const createOrGetConversation = async (req, res,next) => {
  try {
 
    const {senderId,receiverId} = req.body;
    const conversation = await createOrGet(senderId, receiverId);
    res.status(200).json(success(conversation));
  } catch (err) {
   next(err)
  }
};

const GetConversation = async (req, res,next) => {
  try {
    const senderId = req.user.id;
    const conversation = await handleGetConversations(senderId);
    res.status(200).json(success(conversation));
  } catch (err) {
   next(err)
  }
};
const updateLastConversation = async (req, res, next) => {
  try {
    const _id = req.params.id; 
    const { messageContent } = req.body;
    if (!_id || !messageContent) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const conversation = await updateLastMessage(_id, messageContent);
    res.status(200).json(success(conversation));
  } catch (err) {
    next(err);
  }
};

module.exports={createOrGetConversation,GetConversation,updateLastConversation}