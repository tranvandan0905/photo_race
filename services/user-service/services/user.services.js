const users = require('../models/user.model');
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const { sendVerificationEmail } = require('../controllers/email.controller');
let fakeDB = [];
const handlePostUser = async ({ email, name, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await users.create({
    email,
    name,
    password_hash: hashedPassword,
  });

  return newUser;
};
const handleemailconfirmation = async (email, name, password) => {
  if (!email || !name || !password) {
    throw new Error('Nhập đầy đủ thông tin');
  }

  const checkemail = await findUserWithAnyStatus(email);
  if (checkemail) {
    throw new Error('Email đã tồn tại!');
  }

  const token = crypto.randomUUID();
  fakeDB.push({ email, password, name, token, verified: false });
 await sendVerificationEmail(email, token);
return 'Gửi email xác nhận thành công!';


};
const findUserWithAnyStatus = async (email) => {
  return await users.collection.findOne({ email }); 
};
const handleverifyUser = async (token) => {
  const user = fakeDB.find(u => u.token === token);

  if (!user) {
    throw new Error('Token không hợp lệ hoặc hết hạn!');
  }

  if (user.verified) {
    throw new Error('Tài khoản đã được xác minh trước đó!');
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
    throw new Error('Tạo tài khoản thất bại!');
};
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
const handleDeleteUser = async (_id) => {
  const user = await users.deleteById(_id);
  if (!user) throw new Error("User không tồn tại!");
  return user;
};
const handleUpdateUser = async (data, _id) => {
  const { name, password, xu, role, check_email, imageUrl } = data;

  if (!_id) {
    throw new Error("Thiếu ID người dùng!");
  }

  const userid = await users.findOne({ _id });
  if (!userid) {
    throw new Error("User không tồn tại!");
  }

  const updateData = {
    name: name || userid.name,
    xu: xu !== undefined ? xu : userid.xu,
    role: role || userid.role,
    check_email: check_email !== undefined ? check_email : userid.check_email,
    image: imageUrl || userid.image,
  };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  const result = await users.updateOne({ _id }, { $set: updateData });

  return result;
};
const handleFindIDUser = async (_id) => {
  if (!_id) {
    throw new Error("Thiếu ID người dùng!");
  }
  const result = await users.findById(_id);
  if (!result) {
    throw new Error("Không tìm thấy người dùng!");
  }

  return result;
};
const handeFindUser = async (email) => {
  if (!email) {
    throw new Error("Thiếu email người dùng!");
  }
  const user = await users.findOne({ email });
  return user;
}
const handleFindNameUser = async (name) => {
  if (!name) {
    throw new Error("Thiếu name người dùng!");
  }
  const usersFound = await users.find({
    name: { $regex: name, $options: "i" }
  });

  if (!usersFound || usersFound.length === 0) {
    throw new Error("Không tìm thấy user theo name");
  }
  return usersFound;
};

const handePatchVoteXU = async (_id) => {
  if (!_id) {
    throw new Error("Thiếu ID");
  }
  const finduser = await handleFindIDUser(_id);
  const newXu = finduser.xu - 5;
  if (newXu < 0) {
    throw new Error("Không đủ XU để vote!");
  }

  const result = await users.updateOne(
    { _id },
    { $set: { xu: newXu } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Không tìm thấy user để cập nhật!");
  }

  return result;
}
const handeCancelVoteXU = async (_id) => {
  if (!_id) {
    throw new Error("Thiếu ID");
  }
  const finduser = await handleFindIDUser(_id);
  const newXu = finduser.xu + 5;
  const result = await users.updateOne(
    { _id },
    { $set: { xu: newXu } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Không tìm thấy user để cập nhật!");
  }

  return result;
}



module.exports = {
  handleverifyUser, handleemailconfirmation, handlePostUser, handleFindNameUser, handGetUser, handleDeleteUser, handleUpdateUser, handleFindIDUser, handeFindUser, handePatchVoteXU, handeCancelVoteXU
};
