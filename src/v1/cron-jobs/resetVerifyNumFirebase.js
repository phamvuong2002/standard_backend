"use strict";

const cron = require("node-cron");
const firebaseAccountModel = require("../models/firebase.accounts.model");

const resetVerifyPerDay = async () => {
  try {
    await firebaseAccountModel.updateMany({}, { $set: { verify_per_day: 0 } });
    console.log("Successfully reset verify_per_day for all accounts");
  } catch (error) {
    console.error("Error resetting verify_per_day:", error);
  }
};

// Thiết lập cron job chạy mỗi ngày vào lúc nửa đêm
cron.schedule("0 0 * * *", resetVerifyPerDay, {
  timezone: "Asia/Ho_Chi_Minh",
});

console.log(
  "Cron job has been set up to reset verify_per_day daily at midnight"
);
