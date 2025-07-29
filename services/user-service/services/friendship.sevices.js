const Friendship = require('../models/friendship.model');
const axios = require('axios');
const AppError = require('../utils/AppError');
const handecreatefriendship = async (user_id_1, user_id_2) => {
    const existing = await Friendship.findOne({
        $or: [
            { user_id_1, user_id_2 },
            { user_id_1: user_id_2, user_id_2: user_id_1 }
        ]
    });
    if (existing) throw new AppError("Đã gửi lời mời kết bạn", 200);
    const friendship = await Friendship.create({
        user_id_1,
        user_id_2,
        status: 'pending'
    });

    return friendship;
}
const handegetfriendship = async (user_id, check) => {
    let existing = [];

    if (check === "isReceiver") {
        existing = await Friendship.find({
            status: "pending",
            user_id_2: user_id
        })
            .populate("user_id_1", "name image");
        return existing.map(f => ({
            _id: f._id,
            user: f.user_id_1
        }));
    }

    if (check === "accepted") {
        const friendships = await Friendship.find({
            status: "accepted",
            $or: [
                { user_id_1: user_id },
                { user_id_2: user_id }
            ]
        }).populate("user_id_1 user_id_2", "name image");

        return friendships.map(f => ({
            _id: f._id,
            user: f.user_id_1._id.toString() === user_id
                ? f.user_id_2
                : f.user_id_1
        }));
    }

    existing = await Friendship.find({
        status: "pending",
        user_id_1: user_id
    })
        .populate("user_id_2", "name image");

    return existing.map(f => ({
        _id: f._id,
        user: f.user_id_2
    }));
};

const handeupdatefriendship = async (_id, user_id_1, user_id_2, status) => {
    let data;
    if (status === "rejected") {
        return await Friendship.findByIdAndDelete(_id);
    }

    if (status === "accepted") {
        data = await Friendship.findByIdAndUpdate(
            _id,
            { status: "accepted" },
            { new: true }
        );
             await axios.post("http://chat-service:3012/api/chat/conversation", {
            senderId: user_id_1,
            receiverId: user_id_2,
        });
    }

    return data;
};
module.exports = { handecreatefriendship, handeupdatefriendship, handegetfriendship }