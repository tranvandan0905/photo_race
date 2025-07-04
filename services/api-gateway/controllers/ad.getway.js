const axios = require('axios');

const PostAdvertiser = async (req, res) => {
    try {
        
        const response = await axios.post('http://ad-service:3009/api/ad/advertisers',req.body);
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

const DeleteAdvertiser = async (req, res) => {
    try {
        const response = await axios.delete(`http://ad-service:3009/api/ad/advertisers/${req.params.id}`);
        return res.status(201).json({message:" Xóa thành công!!" });
    } catch (error) {
        return res.status(400).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

const GetAdvertisers = async (req, res) => {
    try {
        const response = await axios.get(`http://ad-service:3009/api/ad/advertisers`);
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

const PostAd = async (req, res) => {
    try {
         const advertiser_id = req.ads.id;
         const {title, content,image_url,target_url,start_date,end_date}=req.body;
         const data={advertiser_id,title, content,image_url,target_url,start_date,end_date}
        const response =await axios.post(`http://ad-service:3009/api/ad/ads`,data);
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

const GetAds = async (req, res) => {
    try {
    
        const response = await axios.get('http://ad-service:3009/api/ad/ads');
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const GetAdsByAdvertiser = async (req, res) => {
    try {
         const advertiser_id = req.ads.id;
        const response = await axios.get(`http://ad-service:3009/api/ad/ads/byAdvertiser/${advertiser_id}`)
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const GetActiveAds = async (req, res) => {
  try {
        const response = await axios.get(`http://ad-service:3009/api/ad/ads/activeAds`)
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(400).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

module.exports = {
    PostAdvertiser,
    DeleteAdvertiser,
    GetAdvertisers,
    PostAd,
    GetAds,
    GetAdsByAdvertiser,
    GetActiveAds
};
