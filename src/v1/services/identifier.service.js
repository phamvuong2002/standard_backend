"use strict";

const { BadRequestError } = require("../core/error.response");
const userModel = require("../models/user.model");

class Identifier {
  static strategies = {
    email: (identifier) => identifier.includes("@"),
    phone: (identifier) => /^\d+$/.test(identifier),
    username: (identifier) =>
      !identifier.includes("@") && !/^\d+$/.test(identifier),
  };

  static lookupTable = {
    email: (identifier) => userModel.findOne({ email: identifier }),
    phone: (identifier) => userModel.findOne({ phone: identifier }),
    username: (identifier) => userModel.findOne({ username: identifier }),
  };

  static getIdentifierType(identifier) {
    for (const [type, strategy] of Object.entries(this.strategies)) {
      if (strategy(identifier)) {
        return type;
      }
    }
    throw new BadRequestError("Invalid identifier type");
  }

  static async findUserByIdentifier(identifier) {
    const identifierType = this.getIdentifierType(identifier);

    const findUserFunction = this.lookupTable[identifierType];
    console.log("findUserFunction::", findUserFunction);
    console.log("identifierType::", identifierType);

    if (!findUserFunction) {
      throw new BadRequestError("No matching function for identifier type");
    }

    const user = await findUserFunction(identifier);
    return user;
  }
}

module.exports = Identifier;
