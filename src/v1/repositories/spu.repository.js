"use strict";

const SpuModel = require("../models/spu.model");

class SpuRepository {
  async createSpuRepo(spuData) {
    return await SpuModel.create(spuData);
  }

  async findSpuById(spu_id) {
    return await SpuModel.findById(spu_id).lean();
  }
}

module.exports = SpuRepository;
