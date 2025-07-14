
const AppError = require('../utils/AppError');

const validateEmail = (req, res, next) => {
    const { email } = req.query ||  req.body;;
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
const validateID_user = (req, res, next) => {
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
module.exports = { validateEmail, validatefindNameUser, validateupdateAvataUser, validateID_user, validatecreateUser };
