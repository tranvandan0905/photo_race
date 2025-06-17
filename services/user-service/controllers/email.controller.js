const nodemailer = require('nodemailer');

// Thay Gmail + mật khẩu ứng dụng của bạn
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dantranvan509@gmail.com',
    pass: 'ohks kwtd hzed uiqz',
  },
});

const sendVerificationEmail = async (toEmail, token) => {
  const verifyLink = `http://localhost:3003/api/user/verify?token=${token}`;
  const mailOptions = {
    from: '"Hệ thống" <dantranvan509@gmail.com>',
    to: toEmail,
    subject: 'Xác minh tài khoản',
    html: `
      <p>Chào bạn,</p>
      <p>Vui lòng xác minh tài khoản bằng cách nhấn vào link bên dưới:</p>
      <a href="${verifyLink}">${verifyLink}</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
