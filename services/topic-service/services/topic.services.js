const topic = require("../models/topic.model");
const AppError = require("../utils/AppError");
const handeGetTopic = async () => {
    const data = await topic.find({});
    return data;
};
const handePostTopic = async (data) => {
    const { title, start_time, end_time } = data;
    const newtopic = await topic.create({
        title,
        start_time,
        end_time
    })
    return newtopic;
};
const handeUpdateTopic = async (_id, data) => {
    const { title, start_time, end_time } = data;
    const topicid = await topic.findOne({ _id });
    if (!topicid) {
        throw new AppError("Topic không tồn tại!",200);
    }
    const updatedTopic = await topic.findOneAndUpdate(
        { _id },
        {
            $set: {
                title: title || topicid.title,
                start_time: start_time || topicid.start_time,
                end_time: end_time || topicid.end_time
            },
        },
        { new: true } 
    );
    return updatedTopic;
    
};
const handeDeleteTopic = async (_id) => {
    const result = await topic.findByIdAndDelete(_id);
    return result;
}
const handeFindTopic = async ({ title }) => {
    const query = {};
    if (title) {
        query.title = { $regex: title, $options: 'i' }; 
    }
    const topics = await topic.find(query);
    return topics;
};

  
module.exports = { handeGetTopic, handePostTopic, handeUpdateTopic,handeDeleteTopic,handeFindTopic };