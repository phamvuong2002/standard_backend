"use strict";

const { SuccessResponse } = require("../core/success.response");

class SkuController {
  constructor({ skuService }) {
    this.skuService = skuService;
  }

  // Create a new SKU
  createSku = async (req, res, next) => {
    const newSku = await this.skuService.createNewSku(req.body);
    new SuccessResponse({
      message: "New SKU is created",
      metadata: newSku,
    }).send(res);
  };

  // Get SKU by ID
  getSkuById = async (req, res, next) => {
    const sku = await this.skuService.getSkuById(req.params.id);
    new SuccessResponse({
      message: "SKU details",
      metadata: sku,
    }).send(res);
  };
}

module.exports = SkuController;
