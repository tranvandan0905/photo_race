const { handeupdatefriendship, handecreatefriendship, handegetfriendship } = require("../services/friendship.sevices");
const { success } = require("../utils/response.util");

const updatefriendship = async (req, res, next) => {
    const { user_id_1, user_id_2, status } = req.body;
    const _id = req.params.id;
    try {
        const data = await handeupdatefriendship( _id, user_id_1, user_id_2, status );
        return res.status(200).json(success(data));
    } catch (error) {
        next(error);
    }
}
const postfrindship = async (req, res, next) => {
    try {
        const { user_id_1, user_id_2 } = req.body;
        const data = await handecreatefriendship(user_id_1, user_id_2)
        return res.status(200).json(success(data));
    } catch (error) {
        next(error);
    }
}
const getfriendship = async (req, res, next) => {
    try {
        const check=req.params.check;
        const user_id=req.params.id;
        const data = await handegetfriendship(user_id,check)
        return res.status(200).json(success(data));
    } catch (error) {
        next(error);
    }
}
module.exports = {getfriendship, updatefriendship, postfrindship }