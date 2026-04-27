const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 0
  }
}, {
  timestamps: true // thêm vào để tạo thêm trường createAt và updateAt trong DB
});

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password"); //- tạo model (cú pháp gồm (tên model, Schema, tên collection trong DB))
module.exports = ForgotPassword;