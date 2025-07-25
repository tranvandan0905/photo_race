const users = require('../models/user.model');
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const { sendVerificationEmail, handleForgotPasswordRequest } = require('../controllers/email.controller');
const AppError = require('../utils/AppError');
// lưu token email
let fakeDB = [];
let fakepasswordDB = [];
// post user
const handlePostUser = async ({ email, name, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await users.create({
    email,
    name,
    password_hash: hashedPassword,
  });

  return newUser;
};
// số lượng user tham gia
const handegetPostUserCountByDateRange = async (data) => {
  const { startDate, endDate } = data;
  // Chuyển startDate và endDate về định dạng Date
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);
  const count = await users.countDocuments({
    created_at: {
      $gte: start,
      $lte: end
    }
  });

  return count;
};
// find user all check
const handGetUser = async (check) => {
  let data = null;
  if (check === "delete") {
    data = await users.findDeleted({});
  } else if (check === "role") {
    data = await users.find({ role: "admin" });
  } else {
    data = await users.find({ deleted: false });
  }

  if (!data || data.length === 0) {
    throw new Error('Không có user nào!');
  }

  return data;
};
// uesr xóa mềm
const handleDeleteUser = async (_id) => {
  const user = await users.deleteById(_id);
  if (!user) throw new AppError("User không tồn tại!", 200);
  return user;
};
// update user 
const handleUpdateUser = async (data, _id) => {
  const { name, password, passwordnew, xu, role, check_email, imageUrl } = data;
  const userid = await users.findOne({ _id });
  if (!userid) {
    throw new AppError("User không tồn tại!", 200);
  }

  const updateData = {
    name: name || userid.name,
    xu: xu !== undefined ? xu : userid.xu,
    role: role || userid.role,
    check_email: check_email !== undefined ? check_email : userid.check_email,
    image: imageUrl || userid.image,
  };
  if (passwordnew) {
    if (!password) {
      throw new AppError("Bạn phải nhập mật khẩu hiện tại để đổi mật khẩu mới!", 200);
    }

    const isMatch = await bcrypt.compare(password, userid.password_hash);
    if (!isMatch) {
      throw new AppError("Mật khẩu cũ không chính xác!", 200);
    }

    updateData.password_hash = await bcrypt.hash(passwordnew, 10);
  }

  const result = await users.updateOne({ _id }, { $set: updateData });
  const updatedUser = await users.findById(_id);
  return updatedUser;

};
// tìm user theo ID trừ user bị delete 
const handleFindIDUser = async (_id) => {
  const result = await users.findById(_id);
  if (!result) {
    throw new AppError("Không tìm thấy người dùng!", 200);
  }
  return result;
};
// mở vô hiệu hóa
const handeFindUser = async (email) => {
  let user = await users.findOneWithDeleted({ email });

  if (!user) {
    throw new AppError("Không tìm thấy người dùng!", 200);
  }

  if (user.deleted) {
    await user.restore();
    user = await users.findOne({ email });
  }

  return user;
};
// Tìm kiếm user theo tên
const handleFindNameUser = async (name) => {
  const usersFound = await users.find({
    name: { $regex: name, $options: "i" }
  });

  if (!usersFound || usersFound.length === 0) {
    throw new AppError("Không tìm thấy user theo name", 200);
  }
  return usersFound;
};
// Trừ xu
const handePatchVoteXU = async (_id) => {

  const finduser = await handleFindIDUser(_id);
  const newXu = finduser.xu - 5;
  if (newXu < 0) {
    throw new AppError("Không đủ XU để vote!", 200);
  }

  const result = await users.updateOne(
    { _id },
    { $set: { xu: newXu } }
  );

  if (result.matchedCount === 0) {
    throw new AppError("Không tìm thấy user để cập nhật!", 200);
  }

  return result;
}
// cộng xu
const handeCancelVoteXU = async (_id) => {

  const finduser = await handleFindIDUser(_id);
  const newXu = finduser.xu + 5;
  const result = await users.updateOne(
    { _id },
    { $set: { xu: newXu } }
  );

  if (result.matchedCount === 0) {
    throw new AppError("Không tìm thấy user để cập nhật!", 200);
  }

  return result;
}
// nạp rút xu
const handeUpdateXU = async (_id, data) => {
  const { amount, check } = data;

  if (!["DepositRequest", "WithdrawRequest"].includes(check)) {
    throw new AppError("Loại giao dịch không hợp lệ", 200);
  }

  const user = await handleFindIDUser(_id);
  if (!user) throw new AppError("Không tìm thấy user", 200);

  let newXu;

  if (check === "DepositRequest") {
    newXu = user.xu + amount;
  } else {
    if (user.xu < amount) {
      throw new AppError("Số dư không đủ để rút", 200);
    }
    newXu = user.xu - amount;
  }

  const result = await users.updateOne(
    { _id },
    { $set: { xu: newXu } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Không thể cập nhật xu", 200);
  }

  return { success: true, xu: newXu };
};
// check email 
const handleemailconfirmation = async (email, name, password) => {
  // if (!email || !name || !password) {
  //   throw new Error('Nhập đầy đủ thông tin');
  // }

  const checkemail = await findUserWithAnyStatus(email);
  if (checkemail) {
    throw new AppError('Email đã tồn tại', 200);
  }

  const token = crypto.randomUUID();
  fakeDB.push({ email, password, name, token, verified: false });
  await sendVerificationEmail(email, token);
  return 'Gửi email xác nhận thành công!';


};
// Xác thực emaill tạo tài khoản
const handleverifyUser = async (token) => {
  const user = fakeDB.find(u => u.token === token);

  if (!user) {
    throw new AppError('Token không hợp lệ hoặc hết hạn!', 200);
  }

  if (user.verified) {
    throw new AppError('Tài khoản đã được xác minh trước đó!', 200);
  }

  user.verified = true;

  const createdUser = await handlePostUser({
    email: user.email,
    name: user.name,
    password: user.password
  });

  if (createdUser)
    return 'Tài khoản đã được xác minh và tạo thành công, bạn hãy tiến hành đăng nhập!';
  else
    throw new AppError('Tạo tài khoản thất bại!', 200);
};
// emaill password
const handleemailpassword = async (email) => {
  const checkemail = await findUserWithAnyStatus(email);
  if (!checkemail) {
    throw new AppError('Email không tồn tại!', 200);
  }

  const token = crypto.randomUUID();
  fakepasswordDB.push({ email, token, verified: false });
  await handleForgotPasswordRequest(email, token);
  return 'Gửi email xác nhận thành công bạn hãy kiểm tra email!';


};
// xác thực emaill password
const handleverifyForgotPassword = async (token, pasword, email) => {
  const user = fakepasswordDB.find(u => u.token === token);

  if (!user) {
    throw new AppError('Token không hợp lệ hoặc hết hạn!', 200);
  }

  if (user.verified) {
    throw new AppError('Tài khoản đã được xác minh trước đó!', 200);
  }

  user.verified = true;
  const hashedPassword = await bcrypt.hash(pasword, 10);
  const User = await users.updateOne({ email: email }, { password_hash: hashedPassword });

  if (User)
    return 'Tài khoản đã được xác minh và tạo mật khẩu thành công, bạn hãy tiến hành đăng nhập!';
  else
    throw new AppError('Tạo tài khoản thất bại!', 200);
};
const findUserWithAnyStatus = async (email) => {
  return await users.collection.findOne({ email });
};
// check pass


module.exports = {
 handegetPostUserCountByDateRange,handleverifyForgotPassword, handleemailpassword, handeUpdateXU, handleverifyUser, handleemailconfirmation, handlePostUser, handleFindNameUser, handGetUser, handleDeleteUser, handleUpdateUser, handleFindIDUser, handeFindUser, handePatchVoteXU, handeCancelVoteXU
};
