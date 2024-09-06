"use strict";

const userModel = require("../models/user.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const EmailService = require("./email.service");
const AccessService = require("./access.service");
const { generateRandomPassword } = require("../utils/generateRandomPass");
const OtpLogService = require("./otpLog.service");

class UserService {
  //check login email token
  static checkLoginEmailToken = async ({ token = null }) => {
    try {
      //1 check token in db
      const { otp_email: email, otp_token } =
        await OtpLogService.checkEmailToken({ token });
      if (!email) throw new BadRequestError("Token not found");

      //2 check email exists in user model
      const foundUser = await UserService.findByEmail({ email });
      if (foundUser) throw new BadRequestError("Email already exists");

      //3 sign up
      const password = generateRandomPassword();
      console.log("password::::", password); // TEST
      const accessData = await AccessService.signUp({
        username: email,
        email,
        password,
        status: "active",
        verify: true,
      });
      return accessData;
    } catch (error) {
      throw new BadRequestError("Verify token failed: " + error.message);
    }
  };
  //new user
  static newUser = async ({
    email = null,
    mail_service = "outlook",
    captcha = null,
  }) => {
    //1 check email exists in dbs
    const foundUser = await UserService.findByEmail({ email });

    //2. if email existed
    if (foundUser) {
      throw new BadRequestError("Email already exists");
    }

    //3. send token via email
    const result = await EmailService.sendEmailToken({
      email,
      mail_service,
    });

    return {
      message: "verify email",
      metadata: {
        service: result?.mail_service,
        toEmail: result?.email,
        status: result?.status,
        info: result?.info,
        error: result?.error,
      },
    };
  };

  //find by email
  static findByEmail = async ({
    email,
    select = {
      email: 1,
      status: 1,
      roles: 1,
      username: 1,
      verify: 1,
    },
  }) => {
    return await userModel.findOne({ email }).select(select).lean();
  };

  //find by phone
  static findByPhone = async ({
    phone,
    select = {
      email: 1,
      status: 1,
      roles: 1,
      username: 1,
      verify: 1,
    },
  }) => {
    return await userModel.findOne({ phone }).select(select).lean();
  };

  //find by username
  static findByUsername = async ({
    username,
    select = {
      email: 1,
      status: 1,
      roles: 1,
      username: 1,
      verify: 1,
    },
  }) => {
    return await userModel.findOne({ username }).select(select).lean();
  };

  static deleteUser = async ({ email_ }) => {
    try {
      await userModel.deleteOne({ email: email_ });
    } catch (err) {
      throw err;
    }
  };
}
module.exports = UserService;
