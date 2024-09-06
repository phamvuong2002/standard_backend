const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tạo cấu trúc OTP
const OTPSchema = new Schema({
    email: { type: String, unique: true },
    otp: String,
    createdAt: Date,
    expiresAt: Date
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;