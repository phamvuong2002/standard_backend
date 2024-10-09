"use strict";

const BrandModel = require("../models/brand.model");

class BrandRepository {
  async findBrandByName(brand_name) {
    return await BrandModel.findOne({ brand_name }).lean();
  }

  async createBrand(brandData) {
    return await BrandModel.create(brandData);
  }
}

module.exports = BrandRepository;
