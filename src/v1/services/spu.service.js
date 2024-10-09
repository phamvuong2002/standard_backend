"use strict";

const spuModel = require("../models/spu.model");
const brandModel = require("../models/brand.model");
const { BadRequestError } = require("../core/error.response");
const slugify = require("slugify");
const BrandService = require("./brand.service");

class SpuService {
  // Tạo mới một SPU
  static async createSpu({
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
    const brand = await BrandService.getBrandIdByName(spu_brand);
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
  static async getSpuById(spuId) {
    const spu = await spuModel.findById(spuId).populate("spu_brand");
    if (!spu) {
      throw new BadRequestError("SPU not found");
    }
    return spu;
  }

  // Cập nhật thông tin SPU
  static async updateSpu(spuId, updateData) {
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
  static async deleteSpu(spuId) {
    const deletedSpu = await spuModel.findByIdAndDelete(spuId);
    if (!deletedSpu) {
      throw new BadRequestError("SPU not found");
    }

    return deletedSpu;
  }

  // Lấy tất cả các SPU
  static async getAllSpus({ limit = 10, skip = 0, sort = "createdAt" }) {
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
