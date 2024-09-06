"use strict";

const { SuccessResponse } = require("../core/success.response");
const EmailService = require("../services/email.service");
const UserService = require("../services/user.service");

class UserController {
  newUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Token is sent successfully",
      metadata: await UserService.newUser({
        email: req.body.email,
        mail_service: req.body.mail_service,
      }),
    }).send(res);
  };

  checkLoginEmailToken = async (req, res, next) => {
    return new SuccessResponse({
      message: "Token is verified successfully",
      metadata: await UserService.checkLoginEmailToken({
        token: req.body.token,
      }),
    }).send(res);
  };
}

module.exports = new UserController();
