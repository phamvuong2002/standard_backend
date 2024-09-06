"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

//create email template
router.post("/create-user-email-token", asyncHandler(userController.newUser));
router.post(
  "/verify-user-email-token",
  asyncHandler(userController.checkLoginEmailToken)
);

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
