"use strict";

const express = require("express");
const router = express.Router();
const emailOTPController = require("../../controllers/emailotp.controller");

const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");


router.post("/send", asyncHandler(emailOTPController.sendOTPEmail))  ;
router.post("/verify", asyncHandler(emailOTPController.verifyOTPEmail))  ;


///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
