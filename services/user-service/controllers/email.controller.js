const nodemailer = require('nodemailer');
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
  return true;
};

const handleForgotPasswordRequest = async (toEmail, token) => {
  const verifyLink = `http://localhost:3000/reset-password?token=${token}&email=${encodeURIComponent(toEmail)}`;

  const mailOptions = {
    from: '"Hệ thống" <dantranvan509@gmail.com>',
    to: toEmail,
    subject: 'Xác minh tài khoản để đặt lại mật khẩu',
    html: `
      <p>Chào bạn,</p>
      <p>Vui lòng nhấn vào đường dẫn dưới đây để đặt lại mật khẩu mới cho tài khoản của bạn:</p>
      <a href="${verifyLink}">${verifyLink}</a>
      <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
    `
  };

  await transporter.sendMail(mailOptions);
  return true;
};


module.exports = { sendVerificationEmail ,handleForgotPasswordRequest};
