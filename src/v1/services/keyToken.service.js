"use strict";

const keytokenModel = require("../models/keyToken.model");
const { Types } = require("mongoose");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
    try {
      //level xxx
      const publicKeyString = publicKey.toString();

      const filter = { user: userId };
      const update = {
        publicKey: publicKeyString,
        refreshTokensUsed: [],
        refreshToken,
      };
      const options = {
        upsert: true,
        new: true,
      };

      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findByUserId = async (userId) => {
    return await keytokenModel
      .findOne({ user: new Types.ObjectId(userId.toString()) })
      .lean();
  };

  static removeKeyById = async (id) => {
    return await keytokenModel.deleteOne(id);
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keytokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keytokenModel.findOne({ refreshToken });
  };

  static deleteKeyByUserId = async (userId) => {
    return await keytokenModel.findOneAndDelete({
      user: userId,
    });
  };
}

module.exports = KeyTokenService;
