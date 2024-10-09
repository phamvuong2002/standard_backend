"use strict";

const { BadRequestError } = require("../core/error.response");

class SkuService {
  constructor({ skuRepository, spuRepository }) {
    this.skuRepository = skuRepository;
    this.spuRepository = spuRepository;
  }

  // Create a new SKU
  async createNewSku(skuData) {
    const { sku_id, sku_spu_id } = skuData;

    // Validate the required fields
    if (!sku_id || !sku_spu_id) {
      throw new BadRequestError("Missing required fields");
    }

    //check sku_id exists
    const foundSku = await this.skuRepository.findSkuById(sku_id);
    console.log("foundSku::", foundSku);
    if (foundSku) {
      throw new BadRequestError("Sku item already exists");
    }

    //check spu_id
    const foundSpu = await this.spuRepository.findSpuById(sku_spu_id);
    if (!foundSpu) {
      throw new BadRequestError("Spu not found");
    }

    const newSku = await this.skuRepository.createSkuRepo(skuData);

    if (!newSku) {
      throw new BadRequestError("Create SKU failed");
    }

    return newSku;
  }

  // Get SKU by ID
  async getSkuById(sku_id) {
    const sku = await this.skuRepository.findSkuById(sku_id);
    if (!sku) {
      throw new BadRequestError(`SKU with ID "${sku_id}" not found`);
    }
    return sku;
  }
}

module.exports = SkuService;
