"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// check apiKey
router.use(apiKey);

router.use("/v1/api/sku", require("./sku"));
router.use("/v1/api/spu", require("./spu"));
router.use("/v1/api/brand", require("./brand"));
router.use("/v1/api/user", require("./user"));
router.use("/v1/api/sms", require("./sms"));
router.use("/v1/api/email", require("./email"));
router.use("/v1/api/access", require("./access"));

//sudo role
router.use(permission("0030"));
router.use("/v1/api/sudo", require("./sudo"));

//check permissions - apply for admin
router.use("/v1/api/admin", require("./admin"));

module.exports = router;
