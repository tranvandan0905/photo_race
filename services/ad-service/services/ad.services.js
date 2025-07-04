const Advertiser = require("../models/advertisers.model");
const Ad = require("../models/ads.model");
const bcrypt = require("bcrypt");
const findAdvertiserByEmail = async (email) => {
    return await Advertiser.collection.findOne({ email });
};

const findAdvertiserByPhone = async (phone) => {
    return await Advertiser.collection.findOne({ phone });
};

const handleCreateAdvertiser = async (data) => {
    const { name, email, password, phone, company_name, website } = data;
    if (
        !name || !email || !password || !phone ||
        !company_name
    ) {
        throw new Error("Vui lòng nhập đầy đủ tất cả các trường bắt buộc.");
    }
    // 1. Kiểm tra email đã tồn tại chưa
    const existedEmail = await findAdvertiserByEmail(email);
    if (existedEmail) {
        throw new Error("Email đã được sử dụng.");
    }

    // 2. Kiểm tra số điện thoại đã tồn tại chưa
    const existedPhone = await findAdvertiserByPhone(phone);
    if (existedPhone) {
        throw new Error("Số điện thoại đã được sử dụng.");
    }

    // 3. Hash mật khẩu
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Tạo advertiser
    const newAdvertiser = await Advertiser.create({
        name,
        email,
        password: hashedPassword,
        phone,
        company_name,
        website
    });

    return newAdvertiser;
};

const handleDeleteAdvertiser = async (_id) => {
    if (!_id) {
        throw new Error("Thiếu ID!");
    }
    const result = await Advertiser.deleteById(_id);
    if (!result) throw new Error("ID không tồn tại!");
    return result;
}
const handleGetAdvertisers = async () => {
    const data = await Advertiser.find();
    if (!data.length) {
        throw new Error("Không có advertiser nào!");
    }
    return data;
};

const normalizeDate = (input) => {
    const date = new Date(input);
    date.setHours(0, 0, 0, 0);
    return date;
};

const handleCreateAd = async (data) => {
    const {
        advertiser_id,
        title,
        content,
        image_url,
        target_url,
        start_date,
        end_date,
    } = data;

    const startDate = normalizeDate(start_date);
    const endDate = normalizeDate(end_date);

    // Kiểm tra dữ liệu đầu vào
    if (
        !advertiser_id || !title || !content || !image_url ||
        !target_url || !start_date || !end_date
    ) {
        throw new Error("Vui lòng nhập đầy đủ tất cả các trường bắt buộc.");
    }

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error("Ngày bắt đầu hoặc kết thúc không hợp lệ.");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Tăng today lên 1 ngày để thành "ngày mai"
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (startDate < tomorrow) {
        throw new Error("Ngày bắt đầu phải từ ngày hôm sau trở đi.");
    }


    if (endDate < startDate) {
        throw new Error("Ngày kết thúc phải sau ngày bắt đầu.");
    }

    // Truy vấn tất cả quảng cáo giao thời gian
    const overlappedAds = await Ad.find({
        start_date: { $lte: endDate },
        end_date: { $gte: startDate },
    });

    //  Duyệt từng quảng cáo để gom theo ngày
    const dayMap = {};
    for (const ad of overlappedAds) {
        let current = normalizeDate(ad.start_date);
        const adEnd = normalizeDate(ad.end_date);
        while (current <= adEnd) {
            const key = current.toISOString().split("T")[0];
            dayMap[key] = (dayMap[key] || 0) + 1;
            current.setDate(current.getDate() + 1);
        }
    }

    //  Kiểm tra ngày mới có bị trùng quá 3 quảng cáo không
    const checkDate = new Date(startDate);
    while (checkDate <= endDate) {
        const key = checkDate.toISOString().split("T")[0];
        if ((dayMap[key] || 0) >= 3) {
            throw new Error(`Ngày ${key} đã đủ 3 quảng cáo. Vui lòng chọn khoảng khác.`);
        }
        checkDate.setDate(checkDate.getDate() + 1);
    }

    //  Tính chi phí
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24) + 1);
    const price_per_day = Number(process.env.AD_PRICE_PER_DAY || 200000);
    const total_cost = days * price_per_day;

    // Tạo quảng cáo
    const newAd = await Ad.create({
        advertiser_id,
        title,
        content,
        image_url,
        target_url,
        price_per_day,
        start_date: startDate,
        end_date: endDate,
        total_cost,
    });

    return newAd;
};

const handleGetAllAds = async () => {
    return await Ad.find().populate("advertiser_id", "name email company_name");
};
const handleGetActiveAds = async () => {
    const now = new Date();
    return await Ad.find({
        start_date: { $lte: now },
        end_date: { $gte: now },
        status: "active"
    });
};
const handleGetAdsByAdvertiser = async (advertiser_id) => {
    await updateExpiredAds();
    return await Ad.find({ advertiser_id });
};

const updateExpiredAds = async () => {
    await Ad.updateMany(
        {
            status: "active",
            end_date: { $lt: new Date() }
        },
        {
            $set: { status: "completed" }
        }
    );
};

const handeFindadver = async (email) => {
    if (!email) {
        throw new Error("Thiếu email người dùng!");
    }
    const user = await Advertiser.findOne({ email });
    return user;
}
const handelUpdateadver = async (_id, data) => {
  const { password, phone, email, name, passwordnew } = data;

  if (!_id) throw new Error("Thiếu ID!");

  const adver = await Advertiser.findOne({ _id });
  if (!adver) throw new Error("Adver không tồn tại!");

  const isMatch = await bcrypt.compare(password, adver.password);
  if (!isMatch) throw new Error("Mật khẩu cũ không chính xác!");

  let password_hash = adver.password;
  if (passwordnew) {
    password_hash = await bcrypt.hash(passwordnew, 10);
  }

  const updateData = {
    name: name ?? adver.name,
    password: password_hash,
    phone: phone ?? adver.phone,
    email: email ?? adver.email,
  };

  await Advertiser.updateOne({ _id }, { $set: updateData });
  const updated = await Advertiser.findById(_id);
  return updated;
};
const handelUpdateAdFields = async (_id, data) => {
  const { start_date, end_date, is_extendable, status } = data;

  if (!_id) throw new Error("Thiếu ID quảng cáo!");

  const ad = await Ad.findById(_id);
  if (!ad) throw new Error("Không tìm thấy quảng cáo!");

  const updateData = {};

  if (start_date) updateData.start_date = new Date(start_date);
  if (end_date) updateData.end_date = new Date(end_date);
  if (typeof is_extendable === "boolean") updateData.is_extendable = is_extendable;
  if (["pending", "active", "completed", "rejected"].includes(status)) {
    updateData.status = status;
  }

  await Ad.updateOne({ _id }, { $set: updateData });

  const updatedAd = await Ad.findById(_id);
  return updatedAd;
};

module.exports = {handelUpdateAdFields,handelUpdateadver, handleGetActiveAds, handleCreateAdvertiser, handleDeleteAdvertiser, handleGetAdvertisers, handleCreateAd, handleGetAllAds, handleGetAdsByAdvertiser, handeFindadver };
