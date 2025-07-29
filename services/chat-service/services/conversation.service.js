const axios = require("axios");
const Conversation = require("../models/conversation.model");

const createOrGet = async (senderId, receiverId) => {
    let convo = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });
    if (!convo) {
      const  convo = new Conversation({
            participants: [senderId, receiverId],
        });
        await convo.save();
    }
    return convo;
};

const handleGetConversations = async (senderId) => {
    const convos = await Conversation.find({
        participants: senderId
    }).sort({ lastUpdated: -1 });

    const data = await Promise.all(
        convos.map(async (convo) => {
            const otherUserId = convo.participants.find(p => p !== senderId);

            let userInfo = null;
            try {
                const res = await axios.get(`http://user-service:3003/api/user/findID/${otherUserId}`);
                userInfo = res.data?.data;
            } catch (err) {
                console.error("Lỗi khi lấy user:", err.message);
            }

            return {
                _id: convo._id,
                otherUserId,
                senderId,
                lastMessage: convo.lastMessage,
                lastUpdated: convo.lastUpdated,
                name: userInfo?.name ?? "Người dùng",
                avatar: userInfo?.image ?? null
            };
        })
    );

    return data;
};
const updateLastMessage = async (conversationId,text) => {
    const data = await Conversation.findByIdAndUpdate(
        conversationId,
        {
            lastMessage: text,
            lastUpdated: Date.now(),
        },
        { new: true }
    );

    return data;
};

module.exports = { updateLastMessage, createOrGet, handleGetConversations }