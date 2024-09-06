// strategies/smtp.mail.js
"use strict";
const nodemailer = require("nodemailer");

const {
  mail: {
    zoho: { email, password },
  },
} = require("../../configs/config");

class ZohoMail {
  constructor() {
    this.config = {
      host: "smtppro.zoho.com",
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

module.exports = ZohoMail;
