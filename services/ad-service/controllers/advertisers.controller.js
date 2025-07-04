const {
  handleDeleteAdvertiser,
  handleCreateAdvertiser,
  handleGetAdvertisers,
  handeFindadver,
  handelUpdateadver,
} = require("../services/ad.services");

const PostAdvertiser = async (req, res) => {
  try {
    const data = req.body;
    const advertiser = await handleCreateAdvertiser(data);
    return res.status(200).json({
      data: advertiser,
      message: "Thêm Advertiser thành công!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Có lỗi xảy ra!",
    });
  }
};

const DeleteAdvertiser = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await handleDeleteAdvertiser(_id);
    return res.status(200).json({
      data: result,
      message: "Xóa Advertiser thành công!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Có lỗi xảy ra!",
    });
  }
};

const GetAdvertisers = async (req, res) => {
  try {
    const data = await handleGetAdvertisers();
    return res.status(200).json({
      data: data,
      message: "Lấy Advertiser thành công!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Có lỗi xảy ra!",
    });
  }
};
const findadver = async (req, res) => {
  try {
    const { email } = req.query;
    const ads = await handeFindadver(email);
    return res.status(200).json({
      data: ads
    });
  } catch (err) {
    return res.status(400).json({
      data: [],
      message: err.message || "Có lỗi xảy ra!",
    });
  }
}
const Updateadver = async (req,res) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const adver = await handelUpdateadver(_id, data);
    return res.status(200).json({
      data: adver
    });

  } catch (error) {
    return res.status(400).json({
      data: [],
      message: err.message || "Có lỗi sảy ra!",
    })
  }
}

module.exports = {
  PostAdvertiser,
  DeleteAdvertiser,
  GetAdvertisers,
  findadver,
  Updateadver
};
