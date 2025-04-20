
const Submission = require("../models/submission.model");
const axios = require('axios');
const handeGetSubmission = async () => {
    const data = await Submission.find({});
    if (!data) {
        throw new Error("Không có bài đăng nào!");
    }
    return data;
};

// const handlePostSubmission = async (data, image, userID) => {
//     const { topic_id, title } = data;

//     if (!topic_id || !title || !image) {
//         throw new Error("Vui lòng điền đầy đủ thông tin!");
//     }

//     // Tạo form-data để gửi ảnh tới media-service
//     const form = new FormData();
//     form.append("file", image.buffer, image.originalname); // "file" phải đúng với upload.single("file")

//     const response = await axios.post(
//         'http://media-service:5000/api/media/upload', 
//         form,
//         {
//             headers: form.getHeaders(),
//         }
//     );

//     const imageUrl = response.data?.data?.secure_url;

//     if (!imageUrl || !userID) {
//         throw new Error("Lấy ảnh hoặc user thất bại!");
//     }

//     const submission = await submissionModel.create({
//         user_id: userID,
//         topic_id: topic_id,
//         title: title,
//         image: imageUrl,
//     });

//     if (!submission) {
//         throw new Error("Thêm không thành công!");
//     }

//     return submission;
// };
module.exports={handeGetSubmission};