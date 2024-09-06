// context/nodemailer.context.js
"use strict";

class NodemailerContext {
  constructor(strategy) {
    this.setStrategy(strategy);
  }

  setStrategy(strategy) {
    this.strategy = strategy;
    this.transport = this.strategy.createTransport();
  }

  async sendMail(options) {
    if (!this.transport) {
      throw new Error("Nodemailer transport is not initialized");
    }

    const info = await this.transport.sendMail(options);
    return info;
  }
}

module.exports = NodemailerContext;

// const nodemailer = require("nodemailer");
// const { SESClient, SendRawEmailCommand } = require("@aws-sdk/client-ses");

// const {
//   mail: {
//     aws_ses: { account, key, region },
//   },
// } = require("../configs/config");

// class Nodemailer {
//   SESConfig = {
//     region: region,
//     credentials: {
//       accessKeyId: account,
//       secretAccessKey: key,
//     },
//   };

//   // Khởi tạo SES Client
//   AWS_SES = new SESClient(this.SESConfig);

//   transport = nodemailer.createTransport({
//     SES: { ses: this.AWS_SES, aws: { SendRawEmailCommand } },
//   });
// }

// module.exports = new Nodemailer();

// // const { AUTH_EMAIL, AUTH_PASS } = process.env;
// // transport = nodemailer.createTransport({
// // host: "smtp-mail.outlook.com",
// // port: 587,
// // auth: {
// //   user: AUTH_EMAIL,
// //   pass: AUTH_PASS,
// // },
// // });
