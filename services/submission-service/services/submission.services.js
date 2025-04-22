
const Submission = require("../models/submission.model");
const handeGetSubmission = async () => {
    const data = await Submission.find({});
    if (!data) {
        throw new Error("Không có bài đăng nào!");
    }
    return data;
};
const handeFindSubmission_Topic = async (topic_id) => {
    const data = await Submission.find({topic_id});
    return data;
};
const handlePostSubmission = async (user_id, topic_id, title, imageUrl ) => {
    
    const submission = await Submission.create({
        user_id: user_id,
        topic_id: topic_id,
        title: title,
        image: imageUrl,
    });

    if (!submission) {
        throw new Error("Thêm không thành công!");
    }

    return submission;
};
const handeDeleteSubmission = async (_id) => {
    const Sub = await Submission.deleteById(_id);
    if (!Sub) throw new Error("User không tồn tại!");
    return Sub;
  };
module.exports={handeGetSubmission,handlePostSubmission,handeFindSubmission_Topic,handeDeleteSubmission};