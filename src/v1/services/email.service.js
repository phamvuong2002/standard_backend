"use strict";

const { NotFoundError, BadRequestError } = require("../core/error.response");
const NodemailerContext = require("../dbs/init.nodemailer");
const Nodemailer = require("../dbs/init.nodemailer");
const OutlookMail = require("../dbs/nodemailer/init.outlook.stmp");
const SESMail = require("../dbs/nodemailer/init.ses.smpt");
const ZohoMail = require("../dbs/nodemailer/init.zoho.smtp");
const { replacePlaceholder } = require("../utils");
const OtpLogService = require("./otpLog.service");
const Template = require("./template.service");

class EmailService {
  // Send email containing tokens to access
  static sendEmailToken = async ({ email, mail_service }) => {
    try {
      // 1. Get token
      const token = await OtpLogService.newOtpLog({ email });

      // 2. Get template
      const template = await Template.getTemplate({
        tem_name: "HTML EMAIL TOKEN",
      });

      if (!template) {
        throw new NotFoundError({
          message: "Template is not available",
        });
      }

      // 3. Replace placeholder
      const content = await replacePlaceholder(template.tem_html, {
        token_duration: 60,
        verify_link: `https://phamvuong.io.vn?token=${token.otp_token}`,
      });

      // 4. Send email
      const result = await EmailService.sendEmailLinkVerify({
        html: content,
        toEmail: email,
        strategyType: mail_service,
      });

      if (result.status === 0) {
        return { mail_service, email, status: 0, error: result.error };
      }

      return { mail_service, email, status: 1, info: result?.info }; // 1 - sent successfully
    } catch (error) {
      return { mail_service, email, status: 0, error: error.message }; // Return error
    }
  };

  static async sendEmailLinkVerify({
    html,
    toEmail,
    strategyType = "outlook",
    subject = "Verify your email address!",
    text = "Verify your email address!",
  }) {
    try {
      let strategy;

      if (strategyType === "ses") {
        strategy = new SESMail();
      } else if (strategyType === "outlook") {
        strategy = new OutlookMail();
      } else if (strategyType === "zoho") {
        strategy = new ZohoMail();
      } else {
        return {
          message: "SendMail failed",
          error: "Service not found",
          status: 0,
        };
      }

      const nodemailerContext = new NodemailerContext(strategy);

      const mailOptions = {
        from: ' "PhamVuongDev" <support@phamvuong.io.vn> ',
        to: toEmail,
        subject,
        text,
        html,
      };

      const info = await nodemailerContext.sendMail(mailOptions);

      return { message: "Email sent successfully", status: 1, info };
    } catch (error) {
      return { message: "SendMail failed", error: error.message, status: 0 };
    }
  }
}

module.exports = EmailService;
