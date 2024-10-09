"use strict";

const { SuccessResponse } = require("../core/success.response");
// const Brand = require("../services/brand.service");

class BrandController {
  constructor({ brandService }) {
    this.brandService = brandService;
  }
  newBrand = async (req, res, next) => {
    new SuccessResponse({
      message: "new brand is created",
      metadata: await this.brandService.createBrand(req.body),
    }).send(res);
  };
}

module.exports = BrandController;
