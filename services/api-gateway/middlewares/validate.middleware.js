
const AppError = require('../utils/AppError');

const validateEmail = (req, res, next) => {
    const { email } = req.query;
    if (!email) {
        return next(new AppError('Thiếu email!', 422));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new AppError('Email không hợp lệ!', 422));
    }

    next();
};
const validatefindNameUser = (req, res, next) => {
    const { name } = req.query;
    if (!name) {
        return next(new AppError('Thiếu name!', 422));
    }
    next();
};
const validateupdateAvataUser = (req, res, next) => {
    const image = req.file;
    if (!image) {
        return next(new AppError('Thiếu avatar!', 422));
    }
    next();
};
const validateID = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return next(new AppError('Thiếu ID người dùng!', 422));
    }
    next();
}
const validatecreateUser = (req, res, next) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return next(new AppError('Không được để trống!', 422));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new AppError('Email không hợp lệ!', 422));
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        return next(
            new AppError('Mật khẩu phải có ít nhất 6 ký tự, gồm cả chữ và số!', 422)
        );
    }
    next();
}
const validatecreatetopic = (req, res, next) => {
    const { title, start_time, end_time } = req.body;

    if (!title || !start_time || !end_time) {
        return next(new AppError('Không được để trống!', 422));
    }
    next();
}
const validatefindTopic = (req, res, next) => {
    const title = req.query;
    if (!title) {
        return next(new AppError('Không được để trống!', 422));
    }
    next();
}
const validatecreateSub = (req, res, next) => {
    const title = req.body.title;
    const user_id = req.user.id;
    const image = req.file;
    if (!title || !user_id || !image) {
        return next(new AppError('Không được để trống!', 422));
    }
    next();
}
const leoProfanity = require("leo-profanity");
leoProfanity.add([
  "địt", "đụ", "lồn", "buồi", "cặc", "cứt", "chym", "chịch", "nứng", "bú", "liếm", "bú lol", "bú lồn", "thẩm du",
  "quay tay", "thủ dâm", "dâm đãng", "lõa lồ", "dâm dục", "hiếp", "hiếp dâm", "vãi", "vl", "vcl", "dm", "đm", "dmm",
  "đmm", "mẹ mày", "mày chết", "mẹ kiếp", "đồ chó", "thằng chó", "con chó", "mẹ cha", "thằng ngu", "con ngu", "óc chó", "óc lợn", "đần độn",
  "fuck", "shit", "bitch", "bastard", "dick", "pussy", "slut", "asshole", "fucking", "motherfucker"
]);

const isProfane = (text) => {
  return leoProfanity.check(text.toLowerCase());
};
module.exports = {isProfane,validatecreateSub, validatefindTopic, validateEmail, validatefindNameUser, validateupdateAvataUser, validateID, validatecreateUser, validatecreatetopic };
