const nodemailer = require("nodemailer");
const { AUTH_EMAIL, AUTH_PASS } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASS,
  },
});

//test transporter
transporter.verify((error, success) => {
  if (error) {
    console.log("Email messages service error: " + error);
  } else {
    console.log("Ready for Email messages service::", success);
  }
});

const sendEmail = async (mailOptions) => {
  try {
    // console.log(transporter)
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
