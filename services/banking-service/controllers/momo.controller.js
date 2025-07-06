const axios = require("axios");
const crypto = require("crypto");
const momo = async (req, res) => {
  try {
    const { xu, user_id } = req.body;
    const amount = parseInt(xu);

    if (!user_id || !amount || isNaN(amount)) {
      return res.status(400).json({ message: "Thiếu hoặc sai dữ liệu đầu vào!" });
    }

    // MoMo config
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const partnerCode = "MOMO";
    const orderInfo = "Thanh toán xu bằng MoMo";
    const redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b"; 
    const ipnUrl = "http://banking-service:3010/api/banking/momo/ipn";
    const requestType = "payWithMethod";
    const orderId = partnerCode + Date.now();
    const requestId = orderId;
    const extraData = Buffer.from(JSON.stringify({ user_id, xu: amount })).toString("base64");
    const autoCapture = true;
    const lang = "vi";

    // Tạo chuỗi ký
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto.createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

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
      headers: {
        "Content-Type": "application/json"
      },
      data: requestBody
    };

    const result = await axios(option);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error("MoMo Create Error:", error);
    return res.status(500).json({ message: "Lỗi gửi yêu cầu thanh toán MoMo" });
  }
};

const handleMoMoIPN = async (req, res) => {
  try {
    const { resultCode, extraData } = req.body;

    if (resultCode !== 0) {
      return res.status(400).json({ message: "MoMo thông báo thanh toán thất bại" });
    }

    const decoded = JSON.parse(Buffer.from(extraData, "base64").toString("utf-8"));
    const { user_id, xu } = decoded;

    let amount = Math.floor(parseInt(xu) / 1000); // Quy đổi 1k = 1 xu

    if (!user_id || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Dữ liệu callback không hợp lệ hoặc số xu không đủ" });
    }

    // Gửi yêu cầu lưu DepositRequest và cộng xu
    const response = await axios.post("http://banking-service:5000/api/banking/depositrequest", {
      user_id,
      amount
    });

    return res.status(200).json({
      message: "Giao dịch MoMo thành công và xu đã được cộng!",
      data: response.data
    });
  } catch (err) {
    console.error("MoMo IPN Error:", err.message);
    return res.status(500).json({ message: "Lỗi xử lý IPN từ MoMo" });
  }
};

module.exports = {
  momo,
  handleMoMoIPN
};
