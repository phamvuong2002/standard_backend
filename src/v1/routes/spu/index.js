"use strict";

const express = require("express");
const router = express.Router();
// const brandController = require("../../controllers/brand.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const container = require("../../containers/di-container");
const spuController = container.resolve("spuController");

//create new spu
router.post("/create-spu", asyncHandler(spuController.createSpu));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
