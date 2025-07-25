const axios = require('axios');
const PostAdvertiser = async (req, res) => {
    try {
        const response = await axios.post('http://ad-service:3009/api/ad/advertisers', req.body);
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

const DeleteAdvertiser = async (req, res) => {
    try {
        const response = await axios.delete(`http://ad-service:3009/api/ad/advertisers/${req.params.id}`);
        return res.status(201).json({ message: " Xóa thành công!!" });
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

const GetAdvertisers = async (req, res) => {
    try {
        const response = await axios.get(`http://ad-service:3009/api/ad/advertisers`);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

const PostAd = async (req, res) => {
    try {
        const advertiser_id = req.ads.id;
        const { title, content, image_url, target_url, start_date, end_date } = req.body;
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24) + 1);
        const price_per_day = Number(200000);
        const xu = days * price_per_day;
        const data = { xu, advertiser_id, title, content, image_url, target_url, start_date, end_date }
        const response = await axios.post(`http://ad-service:3009/api/ad/ads`, data);
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};

const GetAds = async (req, res) => {
    try {

        const response = await axios.get('http://ad-service:3009/api/ad/ads');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({
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
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const GetActiveAds = async (req, res) => {
    try {
        const response = await axios.get(`http://ad-service:3009/api/ad/ads/activeAds`)
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const FindverID = async (req, res) => {
    try {
        const advertiser_id = req.ads.id;
        const response = await axios.get(`http://ad-service:3009/api/ad/advertisers/${advertiser_id}`)
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const UpdateAds = async (req, res) => {
    try {
        let ads;
        let resp;
        const advertiser_id = req.ads.id;
        try {
            ads = await axios.put(`http://ad-service:3009/api/ad/ads/update/${req.params.id}`, req.body)
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
        if (ads) {
            const startDate = new Date(ads.data?.data?.start_date);
            const endDate = new Date(ads.data?.data?.end_date);
            const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            const price_per_day = 200000;
            const amount = days * price_per_day;
            const newdata = {
                advertiser_id,
                ad_id: ads.data?.data?._id,
                amount,
                price_per_day
            }
            resp = await axios.post("http://banking-service:3010/api/banking/momoAds", newdata);
        }

        return res.status(200).json(resp.data);
    } catch (error) {

    }
};
const UpdateAdsadmin = async (req, res) => {
    try {
        const ads = await axios.put(`http://ad-service:3009/api/ad/ads/updateadmin/${req.params.id}`, req.body)
        return res.status(200).json(ads.data);
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const Updateadver = async (req, res) => {
    try {


        try {
            const advertiser_id = req.ads.id;
            const response = await axios.put(`http://ad-service:3009/api/ad/advertisers/${advertiser_id}`, req.body)
            return res.status(200).json({ data: response.data });
        } catch (error) {
            return res.status(500).json({
                message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const GetAdsByAdvertiserAdmin = async (req, res) => {
    try {
        const advertiser_id = req.params.id;
        const response = await axios.get(`http://ad-service:3009/api/ad/ads/byAdvertiser/${advertiser_id}`)
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const GetPaymentByAdvertiser = async (req, res) => {
    try {
        const ad_id = req.params.id;
        const response = await axios.get(`http://ad-service:3009/api/ad/adpayment/${ad_id}`)
        return res.status(200).json({ data: response.data });
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
const getAdpayment = async (req, res) => {
    try {
        const response = await axios.get(`http://ad-service:3009/api/ad/adPaymentAdmin`)
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({
            message: error.response?.data?.message || "Có lỗi xảy ra khi gọi API!"
        });
    }
};
module.exports = {
    getAdpayment,
    PostAdvertiser,
    DeleteAdvertiser,
    GetAdvertisers,
    PostAd,
    GetAds,
    GetAdsByAdvertiser,
    GetActiveAds,
    Updateadver,
    UpdateAds,
    FindverID,
    GetPaymentByAdvertiser,
    GetAdsByAdvertiserAdmin,
    UpdateAdsadmin
};
