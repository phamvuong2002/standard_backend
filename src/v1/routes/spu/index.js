"use strict";

const express = require("express");
const router = express.Router();
const spuController = require("../../controllers/spu.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

//create new brand
router.post("/create-spu", asyncHandler(spuController.createSpu));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
