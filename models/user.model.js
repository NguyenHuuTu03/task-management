const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  tokenUser: String,
  phone: String,
  avatar: String,
  address: String,
  status: {
    type: String,
    default: "active"
  },
  deleted: {
    type: Boolean,
    default: false // để mỗi khi thêm sản phẩm vào DB mà không có trường deleted thì nó mặc định là false
  },
  deletedAt: Date,

}, {
  timestamps: true // thêm vào để tạo thêm trường createAt và updateAt trong DB
});

const User = mongoose.model("User", userSchema, "users"); //- tạo model (cú pháp gồm (tên model, Schema, tên collection trong DB))
module.exports = User;