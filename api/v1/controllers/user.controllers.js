const User = require("../../../models/user.model");
const md5 = require('md5');

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