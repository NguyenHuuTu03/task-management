module.exports.sendMail = (email, subject, html) => {
  const nodemailer = require("nodemailer");

  // tạo transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // email của bạn
      pass: process.env.EMAIL_PASSWORD // app password (không phải mật khẩu thường)
    }
  });

  // nội dung email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html
  };

  // gửi mail
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Lỗi:", err);
    } else {
      console.log("Đã gửi:", info.response);
    }
  });
}