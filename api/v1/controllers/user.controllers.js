const User = require("../../../models/user.model");
const ForgotPassword = require("../../../models/forgot-password.model");
const md5 = require('md5');
const generateHelpers = require("../../../helpers/generate");
const sendMailHelpers = require("../../../helpers/sendMail");


// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  });
  if (exitsEmail) {
    res.json({
      code: "400",
      message: "Email đã tồn tại"
    });
  } else {
    req.body.password = md5(req.body.password);
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    const tokenUser = res.cookie("tokenUser", user.tokenUser);
    res.json({
      code: "200",
      message: "Đăng ký thành công!",
      tokenUser: user.tokenUser
    });
  }
}

// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  });
  if (!exitsEmail) {
    res.json({
      code: "400",
      message: "Email không tồn tại!"
    });
    return
  }
  if (md5(req.body.password) != exitsEmail.password) {
    res.json({
      code: "400",
      message: "Sai mật khẩu!"
    });
    return;
  }
  res.cookie("tokenUser", exitsEmail.tokenUser);
  res.json({
    code: "200",
    message: "Đăng nhập thành công!",
    tokenUser: exitsEmail.tokenUser
  });
}

// [POST] /api/v1/users/password/forgot
module.exports.forgot = async (req, res) => {
  const email = req.body.email;
  const exitsEmail = await User.findOne({
    email: email,
    deleted: false
  });
  if (!exitsEmail) {
    res.json({
      code: "400",
      message: "Email không tồn tại!"
    });
    return;
  }
  const otp = generateHelpers.generateRandomNumber(8);
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + 1000
  }
  // lưu forgotPassword vào db
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  // end lưu forgotPassword vào db

  const subject = `Mã OTP`;
  const html = `Mã OTP của bạn là: <b>${forgotPassword.otp}</b>. Mã OTP sẽ hết hạn sau <b>${forgotPassword.expireAt}</b>.`;

  sendMailHelpers.sendMail(email, subject, html);

  res.json({
    code: "200",
    message: "Đã gửi mã OTP qua email"
  });
}

// [POST] /api/v1/users/password/otp
module.exports.otp = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const exitsForgotPassword = await ForgotPassword.findOne({
    email: email,
    otp: otp
  });
  if (!exitsForgotPassword) {
    res.json({
      code: "400",
      message: "Mã OTP không hợp lệ!"
    });
    return;
  }
  const user = await User.findOne({
    email: email
  });
  res.cookie("tokenUser", user.tokenUser);
  res.json({
    code: "200",
    message: "Xác thực thành công!",
    tokenUser: user.tokenUser
  });
}

// [POST] /api/v1/users/password/reset
module.exports.reset = async (req, res) => {
  const tokenUser = req.body.tokenUser;
  const password = md5(req.body.password);
  const user = await User.findOne({
    tokenUser: tokenUser
  });
  if (password == user.password) {
    res.json({
      code: "400",
      message: "Mật khẩu mới không được trùng với mật khẩu cũ!"
    });
    return
  }
  await User.updateOne({
    tokenUser: tokenUser
  }, {
    password: password
  });
  res.json({
    code: "200",
    message: "Đổi mật khẩu thành công!",
    tokenUser: tokenUser
  });
}

// [GET] /api/v1/users/detail
module.exports.detail = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;
  const user = await User.findOne({
    tokenUser: tokenUser
  }).select("-password -tokenUser");

  res.json({
    code: "200",
    message: "Thành công!",
    user: user
  });
}