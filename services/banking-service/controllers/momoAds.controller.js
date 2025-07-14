const axios = require("axios");
const crypto = require("crypto");

// Gửi yêu cầu tạo thanh toán MoMo
const momoAds = async (req, res) => {
    try {
        const {

            advertiser_id,
            ad_id,
            amount,
            price_per_day

        } = req.body;
        const xu = parseInt(amount);
        const p = parseInt(price_per_day);
        if (!advertiser_id || !ad_id || isNaN(p) || isNaN(xu) || xu <= 0) {
            return res.status(400).json({ message: "Thiếu hoặc sai dữ liệu đầu vào!" });
        }


        // MoMo config
        const accessKey = "F8BBA842ECF85";
        const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        const partnerCode = "MOMO";
        const orderInfo = "Thanh toán xu bằng MoMo";
        const redirectUrl = "http://localhost:3000/banking/momo-success";
        const ipnUrl = "http://banking-service:3010/api/banking/momo/ipnAds";
        const requestType = "payWithMethod";
        const orderId = partnerCode + Date.now();
        const requestId = orderId;
        const extraData = Buffer.from(JSON.stringify({ advertiser_id, ad_id, price_per_day:p, amount:xu })).toString("base64");
        const autoCapture = true;
        const lang = "vi";

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

        const requestBody = {
            partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang,
            requestType,
            autoCapture,
            extraData,
            orderGroupId: "",
            signature
        };

        const option = {
            method: "POST",
            url: "https://test-payment.momo.vn/v2/gateway/api/create",
            headers: { "Content-Type": "application/json" },
            data: requestBody
        };

        const response = await axios(option);
        if (response.data && response.data.resultCode === 0 && response.data.payUrl) {
            await axios.post(ipnUrl, {
                resultCode: 0,
                advertiser_id,
                ad_id,
                amount,
                price_per_day
            });
        }

        return res.status(200).json(response.data);
    } catch (error) {
        console.error("MoMo Create Error:", error.response?.data || error.message);
        return res.status(500).json({ message: "Lỗi gửi yêu cầu thanh toán MoMo" });
    }
};
// Xử lý IPN
const handleMoMoIPNAds = async (req, res) => {
    try {
        const {
            advertiser_id,
            ad_id,
            amount,
            price_per_day,
            resultCode
        } = req.body;

        if (parseInt(resultCode) !== 0) {
            return res.status(400).json({ message: "MoMo thông báo thanh toán thất bại" });
        }

        if (!advertiser_id || isNaN(amount) || !ad_id || !price_per_day || amount <= 0) {
            return res.status(400).json({ message: "Dữ liệu callback không hợp lệ hoặc số xu không đủ" });
        }

        const response = await axios.post('http://ad-service:3009/api/ad/adPayment', {
            advertiser_id,
            ad_id,
            amount,
            price_per_day
        });

        return res.status(200).json({
            message: "Giao dịch MoMo thành công và xu đã được cộng!",
            data: response.data
        });
    } catch (err) {
        console.error("MoMo IPN Error:", err.response?.data || err.message);
        return res.status(500).json({ message: "Lỗi xử lý IPN từ MoMo" });
    }
};

module.exports = {
    momoAds,
    handleMoMoIPNAds
};
