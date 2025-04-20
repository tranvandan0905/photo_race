const { uploadToCloudinary, deleteFromCloudinary } = require('../services/cloudinary.service');

const postmidia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ errorCode: 1, message: 'Chưa chọn file!' });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    return res.status(200).json({ errorCode: 0, data: result });
  } catch (error) {
    return res.status(500).json({ errorCode: 1, message: error.message });
  }
};

const deletemidia = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ errorCode: 1, message: 'Thiếu imageUrl!' });
    }

    const result = await deleteFromCloudinary(imageUrl);
    return res.status(200).json({ errorCode: 0, data: result });
  } catch (error) {
    return res.status(500).json({ errorCode: 1, message: error.message });
  }
};

module.exports = { postmidia, deletemidia };
