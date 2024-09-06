"use strict";

const { SuccessResponse } = require("../core/success.response");
const OTPService = require("../services/otp.service");

class OTPController {
  sendOTP = async (req, res, next) => {
    const data = await OTPService.sendOTP(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  verifyOTP = async (req, res, next) => {
    const data = await OTPService.verifyOTP(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new OTPController();
