"use strict";
const nodemailer = require("nodemailer");
const { SESClient, SendRawEmailCommand } = require("@aws-sdk/client-ses");

const {
  mail: {
    aws_ses: { account, key, region },
  },
} = require("../../configs/config");

class SESMail {
  constructor() {
    this.SESConfig = {
      region: region,
      credentials: {
        accessKeyId: account,
        secretAccessKey: key,
      },
    };
    this.AWS_SES = new SESClient(this.SESConfig);
  }

  createTransport() {
    return nodemailer.createTransport({
      SES: { ses: this.AWS_SES, aws: { SendRawEmailCommand } },
    });
  }
}

module.exports = SESMail;
