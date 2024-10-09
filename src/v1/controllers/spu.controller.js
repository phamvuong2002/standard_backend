"use strict";

const { SuccessResponse } = require("../core/success.response");
const SpuService = require("../services/spu.service");

class SpuController {
  // Tạo mới SPU
  createSpu = async (req, res, next) => {
    new SuccessResponse({
      message: "New SPU is created",
      metadata: await SpuService.createSpu(req.body),
    }).send(res);
  };

  // Lấy thông tin SPU theo ID
  getSpuById = async (req, res, next) => {
    new SuccessResponse({
      message: "SPU details fetched",
      metadata: await SpuService.getSpuById(req.params.id),
    }).send(res);
  };

  // Cập nhật SPU theo ID
  updateSpu = async (req, res, next) => {
    new SuccessResponse({
      message: "SPU is updated",
      metadata: await SpuService.updateSpu(req.params.id, req.body),
    }).send(res);
  };

  // Xoá SPU theo ID
  deleteSpu = async (req, res, next) => {
    new SuccessResponse({
      message: "SPU is deleted",
      metadata: await SpuService.deleteSpu(req.params.id),
    }).send(res);
  };

  // Lấy tất cả các SPU (có phân trang)
  getAllSpus = async (req, res, next) => {
    const { limit, skip, sort } = req.query;
    new SuccessResponse({
      message: "All SPUs fetched",
      metadata: await SpuService.getAllSpus({ limit, skip, sort }),
    }).send(res);
  };
}

module.exports = new SpuController();
