"use strict";

const express = require("express");
const router = express.Router();
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

//signUp
router.post("/signup", asyncHandler(accessController.signUp));

//login
router.post("/login", asyncHandler(accessController.login));
// router.post("/login_sms", asyncHandler(accessController.login_sms));

///authentication////
router.use(authentication);
//////////////////////
//logout
router.post("/logout", asyncHandler(accessController.logout));
router.post(
  "/handleRefreshToken",
  asyncHandler(accessController.handleRefreshToken)
);

module.exports = router;
