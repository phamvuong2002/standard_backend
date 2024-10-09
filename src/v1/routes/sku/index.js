"use strict";

const express = require("express");
const router = express.Router();
// const brandController = require("../../controllers/brand.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");
const container = require("../../containers/di-container");
const skuController = container.resolve("skuController");

//create new spu
router.post("/create-sku", asyncHandler(skuController.createSku));

///authentication////
router.use(authentication);
//////////////////////

module.exports = router;
