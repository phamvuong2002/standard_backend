"use strict";

const { randomInt } = require("crypto");

const otpLogModel = require("../models/otpLog.model");
const { BadRequestError } = require("../core/error.response");
const { OTP_LENGTH } = require("../const");

class OtpLogService {
  static checkEmailOtp = async ({ otp }) => {
    if (otp.length != OTP_LENGTH) {
      throw new BadRequestError(`Otp must be ${OTP_LENGTH} characters`);
    }
    const foundOTP = await otpLogModel.findOne({
      otp_code: otp,
    });
    if (!foundOTP) throw new BadRequestError("OTP not found");
    // delete token
    otpLogModel.deleteOne({ otp_code: otp }).then();
    return foundOTP;
  };

  static checkEmailToken = async ({ token }) => {
    const foundToken = await otpLogModel.findOne({
      otp_token: token,
    });
    if (!foundToken) throw new BadRequestError("Token not found");
    // delete token
    otpLogModel.deleteOne({ otp_token: token }).then();
    return foundToken;
  };

  static generatorTokenRandom = () => {
    const token = randomInt(0, Math.pow(2, 32));
    return token;
  };

  static generatorCodeRandom = (n) => {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join(
      ""
    );
  };

  static newOtpLog = async ({ email }) => {
    if (!email) {
      throw new BadRequestError("Email is required");
    }

    const token = OtpLogService.generatorTokenRandom();
    const code = OtpLogService.generatorCodeRandom(6);
    const newToken = await otpLogModel.create({
      otp_token: token,
      otp_email: email,
      otp_code: code,
    });

    return newToken;
  };
}
module.exports = OtpLogService;
