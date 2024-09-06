"use strict";

const express = require("express");
const router = express.Router();
const emailController = require("../../controllers/email.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

//create email template
router.post("/create-template", asyncHandler(emailController.newTemplate));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
