const axios = require("axios");
const DepositRequest = require("../models/depositRequest.model");
const WithdrawRequest = require("../models/withdrawRequest.model");
// Gọi API cập nhật xu cho user
const updateXu = async (userId, data) => {
  const { amount, check } = data;

  if (!userId || !amount || !check) {
    throw new Error("Thiếu dữ liệu cập nhật xu");
  }

  const response = await axios.put(`http://user-service:3003/api/user/banking/${userId}`, {
    amount,
    check
  });

  return response.data;
};
const handlegetDepositRequest = async (user_id) => {
  const data = await DepositRequest.find({ user_id });
  return data;
}
const handlegetWithdrawRequest = async (user_id) => {
  const data = await WithdrawRequest.find({ user_id });
  return data;
}
const handlegetALLDepositRequest = async () => {
  const data = await DepositRequest.find({});
  return data;
}
const handlegetALLWithdrawRequest = async () => {
  const data = await WithdrawRequest.find({});
  return data;
}
// Nạp tiền thành công → tạo DepositRequest + cộng xu
const handlePostDepositRequest = async (data) => {
  const { user_id, amount } = data;
  if (!user_id || !amount) {
    throw new Error("Thiếu dữ liệu!");
  }
  const check = "DepositRequest";
  const newdata = { amount, check }
  // Gọi API để lấy danh sách topranking
  const response = await updateXu(user_id, newdata);
  const result = await DepositRequest.create({ user_id, amount, status: "success" });
  if (!result) throw new Error("Không thể tạo yêu cầu nạp tiền!");
  return result;
};
const handlePostWithdrawRequest = async (data) => {
  const { user_id, totalScore, password } = data;
  const amount = totalScore;
  try {

    // Gọi API kiểm tra mật khẩu
    const checkpass = await axios.get(`http://user-service:3003/api/user/checkpass`, {
      params: { user_id, password }
    });

    if (checkpass.data.errorCode === 1) {
      throw new Error(checkpass.data.message || "Sai mật khẩu giao dịch");
    }


    // Gọi API để trừ điểm từ hệ thống topranking
    const response = await axios.put(`http://topranking-service:3007/api/topranking/withdramwUser`, data);

    if (response.data.errorCode === 0) {
      await WithdrawRequest.create({ user_id, amount });
      return true;
    } else {
      throw new Error(response.data.message || 'Xử lý thất bại từ topranking');
    }

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Không thể xử lý yêu cầu rút tiền";

  

    throw new Error(errorMessage);
  }
};


const handegetPostWithdrawRequestCountByDateRange = async (data) => {
  const { startDate, endDate } = data;

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const result = await WithdrawRequest.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: "$status", // Nhóm theo status
        totalAmount: { $sum: "$totalScore" }, // Tổng tiền theo trạng thái
        count: { $sum: 1 } // Số lượng đơn theo trạng thái
      }
    }
  ]);

  const stats = {
    pending: { totalAmount: 0, count: 0 },
    success: { totalAmount: 0, count: 0 },
    contact_support: { totalAmount: 0, count: 0 },
  };

  result.forEach(item => {
    stats[item._id] = {
      totalAmount: item.totalAmount,
      count: item.count
    };
  });

  return stats;
};
const handeupdateWithdrawStatus = async (id, newStatus) => {
  try {
    const allowedStatus = ["pending", "success", "contact_support"];
    if (!allowedStatus.includes(newStatus)) {
      throw new Error("Trạng thái không hợp lệ!");
    }
    const result = await WithdrawRequest.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!result) {
      throw new Error("Không tìm thấy yêu cầu rút tiền!");
    }
    return result;
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error.message);
    throw error;
  }
};
const handegetPostDepositRequestCountByDateRange = async (data) => {
  const { startDate, endDate } = data;

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const result = await DepositRequest.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
        status: "success"
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    }
  ]);

  return {
    totalAmount: result[0]?.totalAmount || 0,
    totalCount: result[0]?.count || 0
  };
};

module.exports = {
  handlePostDepositRequest,
  handlePostWithdrawRequest,
  handlegetDepositRequest,
  handlegetWithdrawRequest,
  handegetPostWithdrawRequestCountByDateRange,
  handegetPostDepositRequestCountByDateRange,
  handlegetALLDepositRequest,
  handlegetALLWithdrawRequest,
  handeupdateWithdrawStatus
};
