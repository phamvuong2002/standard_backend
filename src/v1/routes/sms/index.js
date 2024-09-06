"use strict";

const express = require("express");
const router = express.Router();
const smsController = require("../../controllers/sms.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.post(
  "/firebase/get-account",
  asyncHandler(smsController.getFirebaseAccount)
);

router.post(
  "/firebase/increase-verification",
  asyncHandler(smsController.increaseVerifyPerDay)
);

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
