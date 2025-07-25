const {
  handleCreateAd,
  handleGetAllAds,
  handleGetAdsByAdvertiser,
  handleGetActiveAds,
  handelUpdateAdFields,
  handelUpdateAdadmin,
} = require("../services/ad.services");
const PostAd = async (req, res) => {
  try {
    const ad = await handleCreateAd(req.body);
    res.status(200).json({ data: ad, message: "Tạo quảng cáo thành công!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Có lỗi xảy ra!" });
  }
};

const GetAds = async (req, res) => {
  try {
    const ads = await handleGetAllAds();
    res.status(200).json({ data: ads, message: "Lấy danh sách quảng cáo thành công!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Lỗi khi lấy quảng cáo" });
  }
};
const GetActiveAds = async (req, res) => {
  try {
    const ads = await handleGetActiveAds();
    res.status(200).json({ data: ads, message: "Lấy danh sách quảng cáo thành công!" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Lỗi khi lấy quảng cáo" });
  }
};
const GetAdsByAdvertiser = async (req, res) => {
  try {
    const advertiser_id = req.params.id;
    const ads = await handleGetAdsByAdvertiser(advertiser_id);
    res.status(200).json({ data: ads || []});
  } catch (error) {
    res.status(400).json({ message: error.message || "Lỗi khi lấy quảng cáo theo người đăng" });
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
      message: error.message || "Có lỗi sảy ra!",
    })
  }
};
const UpdateAdsadmin = async (req,res) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const adver = await handelUpdateAdadmin(_id, data);
    return res.status(200).json({
      data: adver
    });

  } catch (error) {
    return res.status(400).json({
      data: [],
      message: error.message || "Có lỗi sảy ra!",
    })
  }
};
module.exports = {
  PostAd,
  GetAds,
  GetAdsByAdvertiser,
  GetActiveAds,
  UpdateAds,
  UpdateAdsadmin
};
