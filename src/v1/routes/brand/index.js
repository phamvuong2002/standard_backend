"use strict";

const express = require("express");
const router = express.Router();
// const brandController = require("../../controllers/brand.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const container = require("../../containers/di-container");
const brandController = container.resolve("brandController");

//create new brand
// router.post("/create-brand", asyncHandler(brandController.newBrand));
router.post("/create-brand", asyncHandler(brandController.newBrand));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
