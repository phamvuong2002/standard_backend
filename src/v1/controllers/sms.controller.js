"use strict";

const { SuccessResponse } = require("../core/success.response");
const SMSService = require("../services/sms.service");

class SMSController {
  static async getFirebaseAccount(req, res, next) {
    const data = await SMSService.getFirebaseAccount();
    new SuccessResponse({
      metadata: data,
    }).send(res);
  }

  static async increaseVerifyPerDay(req, res, next) {
    const data = await SMSService.increaseVerifyPerDay(req.body);
    new SuccessResponse({
      metadata: data,
    }).send(res);
  }
}

module.exports = SMSController;
