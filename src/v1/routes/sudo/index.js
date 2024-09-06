"use strict";

const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.post("/create-api-key", asyncHandler(adminController.createApiKey));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
