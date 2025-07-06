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

// Nạp tiền thành công → tạo DepositRequest + cộng xu
const handlePostDepositRequest = async ({ user_id, amount }) => {
  if (!user_id || !amount) {
    throw new Error("Thiếu dữ liệu!");
  }

  if (amount < 50000) {
    throw new Error("Nạp tối thiểu 50.000 VND");
  }

  const result = await DepositRequest.create({ user_id, amount, status: "success" });

  if (!result) throw new Error("Không thể tạo yêu cầu nạp tiền");

  const dataUpdate = {
    amount,
    check: "DepositRequest"
  };

  const updated = await updateXu(user_id, dataUpdate);
  return updated;
};

// Rút tiền → tạo WithdrawRequest + trừ xu
const handlePostWithdrawRequest = async ({ user_id, amount, targetAccountInfo }) => {
  if (!user_id || !amount || !targetAccountInfo) {
    throw new Error("Thiếu dữ liệu!");
  }

  if (amount < 100000) {
    throw new Error("Rút tối thiểu 100.000 VND");
  }

  const result = await WithdrawRequest.create({
    user_id,
    amount,
    targetAccountInfo,
    status: "pending"
  });

  if (!result) throw new Error("Không thể tạo yêu cầu rút tiền");

  const dataUpdate = {
    amount,
    check: "WithdrawRequest"
  };

  const updated = await updateXu(user_id, dataUpdate);
  return updated;
};

module.exports = {
  handlePostDepositRequest,
  handlePostWithdrawRequest
};
