"use strict";

const { randomInt } = require("crypto");

const otpLogModel = require("../models/otpLog.model");
const { BadRequestError } = require("../core/error.response");

class OtpLogService {
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

  static newOtpLog = async ({ email }) => {
    if (!email) {
      throw new BadRequestError("Email is required");
    }

    const token = OtpLogService.generatorTokenRandom();
    const newToken = await otpLogModel.create({
      otp_token: token,
      otp_email: email,
    });

    return newToken;
  };
}
module.exports = OtpLogService;
