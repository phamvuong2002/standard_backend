"use strict";

const SkuModel = require("../models/sku.model");

class SkuRepository {
  async createSkuRepo(skuData) {
    return await SkuModel.create(skuData);
  }

  async findSkuById(sku_id) {
    return await SkuModel.findOne({ sku_id }).lean();
  }
}

module.exports = SkuRepository;
