const Advertiser = require("../models/advertisers.model");
const Ad = require("../models/ads.model");
const adPayment = require("../models/adPayment.model");
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


    // Tạo quảng cáo
    const newAd = await Ad.create({
        advertiser_id,
        title,
        content,
        image_url,
        target_url,
        start_date: startDate,
        end_date: endDate,

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
    const ads = await Ad.find({ advertiser_id }).lean();
    return ads;
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

const handeFindadverID = async (_id) => {
    if (!_id) {
        throw new Error("Thiếu ID người dùng!");
    }
    const user = await Advertiser.findOne({ _id });
    return user;
}
const handeFindadver = async (email) => {
    if (!email) {
        throw new Error("Thiếu email người dùng!");
    }
    const user = await Advertiser.findOne({ email });
    return user;
}
const handelUpdateadver = async (_id, data) => {
    const { password, phone, email, name, passwordnew, company_name, website } = data;

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
        company_name: company_name ?? adver.company_name,
        website: website ?? adver.website
    };

    await Advertiser.updateOne({ _id }, { $set: updateData });
    const updated = await Advertiser.findById(_id);
    return updated;
};
const handelUpdateAdFields = async (_id, data) => {
    const { start_date, end_date, status } = data;

    if (!_id) throw new Error("Thiếu ID quảng cáo!");

    const ad = await Ad.findById(_id);
    if (!ad) throw new Error("Không tìm thấy quảng cáo!");

    let startDate = start_date ? normalizeDate(start_date) : ad.start_date;
    let endDate = end_date ? normalizeDate(end_date) : ad.end_date;

    const isUpdatingTime = !!start_date || !!end_date;

    if (isUpdatingTime) {
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error("Ngày bắt đầu hoặc kết thúc không hợp lệ.");
        }

        const tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (startDate < tomorrow) {
            throw new Error("Ngày bắt đầu phải từ ngày hôm sau trở đi.");
        }

        if (endDate < startDate) {
            throw new Error("Ngày kết thúc phải sau ngày bắt đầu.");
        }

        const overlappedAds = await Ad.find({
            _id: { $ne: _id },
            start_date: { $lte: endDate },
            end_date: { $gte: startDate },
        });

        const dayMap = {};
        for (const adItem of overlappedAds) {
            let current = normalizeDate(adItem.start_date);
            const adEnd = normalizeDate(adItem.end_date);
            while (current <= adEnd) {
                const key = current.toISOString().split("T")[0];
                dayMap[key] = (dayMap[key] || 0) + 1;
                current.setDate(current.getDate() + 1);
            }
        }

        const checkDate = new Date(startDate);
        while (checkDate <= endDate) {
            const key = checkDate.toISOString().split("T")[0];
            if ((dayMap[key] || 0) >= 3) {
                throw new Error(`Ngày ${key} đã đủ 3 quảng cáo. Vui lòng chọn khoảng khác.`);
            }
            checkDate.setDate(checkDate.getDate() + 1);
        }
    }

    const updateData = {
        start_date: startDate,
        end_date: endDate,
    };

    // Nếu đang cập nhật thời gian → reset status và is_extendable
    if (isUpdatingTime) {
        updateData.status = "pending";
    } else {
        if (["pending", "active", "completed", "rejected"].includes(status)) {
            updateData.status = status;
        }
    }

    await Ad.updateOne({ _id }, { $set: updateData });
    return await Ad.findById(_id);
};
const handelUpdateAdadmin = async (_id, data) => {
  const { status } = data;
  const validStatuses = ["pending", "active", "completed", "rejected"];

  if (!validStatuses.includes(status)) {
    throw new Error("Trạng thái không hợp lệ");
  }

  return await Ad.findByIdAndUpdate(
    _id,
    { status },
    { new: true } 
  );
};


module.exports = {handelUpdateAdadmin, handeFindadverID, handelUpdateAdFields, handelUpdateadver, handleGetActiveAds, handleCreateAdvertiser, handleDeleteAdvertiser, handleGetAdvertisers, handleCreateAd, handleGetAllAds, handleGetAdsByAdvertiser, handeFindadver };
