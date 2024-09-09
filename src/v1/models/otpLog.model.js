"use strict";

const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "OtpLog";
const COLLECTION_NAME = "OtpLogs";

// Declare the Schema of the Mongo model
var otpLogSchema = new Schema(
  {
    otp_token: {
      type: String,
      required: true,
      trim: true,
    },
    otp_email: {
      type: String,
      required: true,
    },
    otp_code: {
      type: String,
    },
    otp_status: {
      type: String,
      default: "pending",
      enum: ["pending", "active", "blocked"],
    },
    expireAt: {
      type: Date,
      default: Date.now(),
      expires: 600,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, otpLogSchema);
