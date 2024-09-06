"use strict";

const { SuccessResponse } = require("../core/success.response");
const emailOTPService = require("../services/emailotp.service");

class emailOTPController {
  sendOTPEmail = async (req, res, next) => {
    const data = await emailOTPService.sendOTPEmail(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };

  verifyOTPEmail = async (req, res, next) => {
    const data = await emailOTPService.verifyOTPEmail(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  };
}

module.exports = new emailOTPController();
