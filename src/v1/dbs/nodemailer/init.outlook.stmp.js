// strategies/smtp.mail.js
"use strict";
const nodemailer = require("nodemailer");

const {
  mail: {
    outlook: { email, password },
  },
} = require("../../configs/config");

class OutlookMail {
  constructor() {
    this.config = {
      host: "smtp-mail.outlook.com",
      port: 587,
      //   secure: true,
      auth: {
        user: email,
        pass: password,
      },
    };
  }

  createTransport() {
    return nodemailer.createTransport(this.config);
  }
}

module.exports = OutlookMail;
