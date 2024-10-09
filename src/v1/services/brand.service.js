"use strict";

const brandModel = require("../models/brand.model");
const { BadRequestError } = require("../core/error.response");
const slugify = require("slugify");

class BrandService {
  constructor({ brandRepository }) {
    this.brandRepository = brandRepository;
  }

  // Hàm tìm ID của Brand dựa vào brand_name
  async getBrandIdByName(brand_name) {
    // Tìm brand theo brand_name
    // const brand = await brandModel.findOne({ brand_name }).lean();
    const brand = await this.brandRepository.findBrandByName(brand_name);

    if (!brand) {
      throw new BadRequestError(`Brand with name "${brand_name}" not found`);
    }
    return brand;
  }

  // create a brand
  async createBrand({
    brand_name,
    brand_images,
    brand_description,
    brand_type,
    brand_country,
    brand_language_code = "en", // Mặc định là 'en'
    brand_characters = "sku-group", // Mặc định là 'sku-group'
  }) {
    // Kiểm tra nếu thiếu các trường bắt buộc
    if (
      !brand_name ||
      !brand_images ||
      !brand_description ||
      !brand_type ||
      !brand_country
    ) {
      throw new BadRequestError("Missing required fields for creating a brand");
    }

    //Kiểm tra tên brand tồn tại chưa
    // const foundBrand = await brandModel.findOne({ brand_name });
    const foundBrand = await this.brandRepository.findBrandByName(brand_name);
    if (foundBrand) {
      throw new BadRequestError("Brand have existed");
    }

    // Tạo brand mới
    const newBrand = await this.brandRepository.createBrand({
      brand_name,
      brand_images,
      brand_description,
      brand_slug: slugify(brand_name),
      brand_type,
      brand_country,
      brand_language_code,
      brand_characters,
    });
    if (!newBrand) {
      throw new BadRequestError("Create brand failed");
    }
    return newBrand;
  }
}
module.exports = BrandService;
