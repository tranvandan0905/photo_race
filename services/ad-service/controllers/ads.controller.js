const {
  handleCreateAd,
  handleGetAllAds,
  handleGetAdsByAdvertiser,
  handleGetActiveAds,
  handelUpdateAdFields,
} = require("../services/ad.services");
const PostAd = async (req, res) => {
  try {
    const ad = await handleCreateAd(req.body);
    res.status(200).json({ data: ad, message: "Tạo quảng cáo thành công!" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Có lỗi xảy ra!" });
  }
};

const GetAds = async (req, res) => {
  try {
    const ads = await handleGetAllAds();
    res.status(200).json({ data: ads, message: "Lấy danh sách quảng cáo thành công!" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Lỗi khi lấy quảng cáo" });
  }
};
const GetActiveAds = async (req, res) => {
  try {
    const ads = await handleGetActiveAds();
    res.status(200).json({ data: ads, message: "Lấy danh sách quảng cáo thành công!" });
  } catch (err) {
    res.status(400).json({ message: err.message || "Lỗi khi lấy quảng cáo" });
  }
};
const GetAdsByAdvertiser = async (req, res) => {
  try {
    const advertiser_id = req.params.id;
    const ads = await handleGetAdsByAdvertiser(advertiser_id);
    res.status(200).json({ data: ads });
  } catch (err) {
    res.status(400).json({ message: err.message || "Lỗi khi lấy quảng cáo theo người đăng" });
  }
};
const UpdateAds = async (req,res) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const adver = await handelUpdateAdFields(_id, data);
    return res.status(200).json({
      data: adver
    });

  } catch (error) {
    return res.status(400).json({
      data: [],
      message: err.message || "Có lỗi sảy ra!",
    })
  }
};
module.exports = {
  PostAd,
  GetAds,
  GetAdsByAdvertiser,
  GetActiveAds,
  UpdateAds
};
