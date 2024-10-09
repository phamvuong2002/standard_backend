"use strict";

const spuModel = require("../models/spu.model");
const { BadRequestError } = require("../core/error.response");
const slugify = require("slugify");
// const BrandService = require("./brand.service");

class SpuService {
  constructor({ brandService }) {
    this.brandService = brandService;
  }
  // Tạo mới một SPU
  async createSpu({
    spu_name,
    spu_thumbnail,
    spu_description,
    spu_quantity,
    spu_type,
    spu_brand,
    spu_attribute,
    spu_variation = [],
  }) {
    // Kiểm tra các trường bắt buộc
    if (
      !spu_name ||
      !spu_thumbnail ||
      !spu_description ||
      !spu_quantity ||
      !spu_type ||
      !spu_brand ||
      !spu_attribute
    ) {
      throw new BadRequestError("Missing required fields for creating an SPU");
    }

    // Kiểm tra thương hiệu (brand) có tồn tại hay không
    const brand = await this.brandService.getBrandIdByName(spu_brand);
    if (!brand) throw new BadRequestError("Band name is not found");

    // Tạo mới SPU
    const newSpu = await spuModel.create({
      spu_name,
      spu_thumbnail,
      spu_description,
      spu_slug: slugify(spu_name),
      spu_quantity,
      spu_type,
      spu_brand: brand?._id,
      spu_attribute,
      spu_variation,
    });

    if (!newSpu) {
      throw new BadRequestError("Create SPU failed");
    }

    return newSpu;
  }

  // Tìm kiếm SPU theo ID
  async getSpuById(spuId) {
    const spu = await spuModel.findById(spuId).populate("spu_brand");
    if (!spu) {
      throw new BadRequestError("SPU not found");
    }
    return spu;
  }

  // Cập nhật thông tin SPU
  async updateSpu(spuId, updateData) {
    const spu = await spuModel.findByIdAndUpdate(spuId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!spu) {
      throw new BadRequestError("SPU not found");
    }

    return spu;
  }

  // Xoá SPU
  async deleteSpu(spuId) {
    const deletedSpu = await spuModel.findByIdAndDelete(spuId);
    if (!deletedSpu) {
      throw new BadRequestError("SPU not found");
    }

    return deletedSpu;
  }

  // Lấy tất cả các SPU
  async getAllSpus({ limit = 10, skip = 0, sort = "createdAt" }) {
    const spus = await spuModel
      .find()
      .populate("spu_brand")
      .sort({ [sort]: -1 })
      .limit(limit)
      .skip(skip);

    return spus;
  }
}

module.exports = SpuService;
