"use strict";

const { add } = require("lodash");
const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const { AuthFailureError } = require("../core/error.response");
const { request } = require("express");

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Regiserted OK!",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    const user = await AccessService.login(req.body);
    if (user) {
      new SuccessResponse({
        metadata: user,
      }).send(res);
    } else {
      new AuthFailureError("Invalid Request");
    }
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout OK!",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  handleRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: "Get token success!",
      metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
    }).send(res);
  };

  login_sms = async (req, res, next) => {
    // const session = req.session.id
    // console.log(session)
    const user = await AccessService.login_sms(req.body);
    // console.log(user);
    if (user) {
      req.session.user = {
        user: user.user,
        token: user.tokens.accessToken,
        sessionid: req.session.id,
      };
    } else {
      new AuthFailureError("Invalid Request");
    }

    new SuccessResponse({
      metadata: user,
    }).send(res);
  };
}

module.exports = new AccessController();
