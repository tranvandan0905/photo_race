const topic = require("../models/topic.model");
const handeGetTopic = async () => {
    const data = await topic.find({});
    if (!data) {
        throw new Error("Không có chủ đề nào!");
    }
    return data;
};
const handePostTopic = async (data) => {
    const { title, start_time, end_time } = data;
    if (!title || !start_time || !end_time) {
        throw new Error('Vui lòng nhập đầy đủ thông tin!');
    }
    const newtopic = await topic.create({
        title,
        start_time,
        end_time
    })
    return newtopic;
};
const handeUpdateTopic = async (_id, data) => {
    const { title, start_time, end_time } = data;
    if (!_id) {
        throw new Error("Thiếu ID topic!");
    }
    const topicid = await topic.findOne({ _id });
    if (!topicid) {
        throw new Error("Topic không tồn tại!");
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
    if (!_id) {
        throw new Error("Thiếu ID topic!");
    }
    const result = await topic.findByIdAndDelete(_id);
    if (!result) throw new Error("Topic không tồn tại!");
    return result;
}
const handeFindTopic = async ({ title }) => {
    const query = {};

    if (title) {
        query.title = { $regex: title, $options: 'i' }; 
    }
    else
    throw new Error("Không có nội dung để tìm kiếm!"); 
    const topics = await topic.find(query);
    if (!topics) throw new Error('Không tìm thấy Topic nào!');
    return topics;
};

  
module.exports = { handeGetTopic, handePostTopic, handeUpdateTopic,handeDeleteTopic,handeFindTopic };