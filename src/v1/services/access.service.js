"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const UserService = require("./user.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInfoData } = require("../utils");

const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const Identifier = require("./identifier.service");
const { USER_STATUS, ROLES } = require("../const");

/// services ///

class AccessService {
  static signUp = async ({
    username,
    email,
    password,
    status = "inactive",
    verify = false,
  }) => {
    // Step 1: check username
    const holderUserName = await userModel.findOne({ username }).lean();
    if (holderUserName) {
      throw new BadRequestError("Username already Registered!");
    }

    // Step 2: check email
    const holderUserEmail = await userModel.findOne({ email }).lean();
    if (holderUserEmail) {
      throw new BadRequestError("Email already Registered!");
    }

    // create new user
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: passwordHash,
      roles: [ROLES.CLIENT],
      status,
      verify,
    });

    if (newUser) {
      //create private key, public key (private key used for syncing a token
      //and public key used for validation that token)

      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });

      //create public key for decoding token
      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newUser._id,
        publicKey: publicKey,
      });

      if (!publicKeyString) {
        throw new BadRequestError("Create Public Key Failed");
      }

      // Create token pair
      const tokens = await createTokenPair(
        { userId: newUser._id, username, email },
        publicKeyString,
        privateKey
      );

      return {
        code: "201",
        metadata: {
          user: getInfoData({
            fileds: ["_id", "username", "email", "roles"],
            object: newUser,
          }),
          tokens,
        },
      };
    }

    //error
    return {
      code: "200",
      metadata: null,
    };
  };

  /*
    1-check email in dbs
    2-match password
    3-create Access Token và RT
    4-generate Token
    5-get data and return
  */
  static login = async ({ email, password, refreshToken = null }) => {
    // 1 - check account in dbs

    const foundUser = await Identifier.findUserByIdentifier(email);

    if (!foundUser) throw new BadRequestError("User not registered");
    if (!foundUser.verify)
      throw new BadRequestError("User have not verified yet");
    if (foundUser.status === USER_STATUS.INACTIVE)
      throw new BadRequestError("User have been inactive");

    //2 - match password
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new AuthFailureError("Authentication failed");

    //3 create private key, public key (private key used for syncing a token
    //and public key used for validation that token)
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });
    //create public key for decoding token
    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: foundUser._id,
      publicKey: publicKey,
    });

    //4 - generate Token
    const tokens = await createTokenPair(
      {
        userId: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
      publicKeyString,
      privateKey
    );

    //5 - get data and return
    await KeyTokenService.createKeyToken({
      userId: foundUser._id,
      publicKey: publicKey,
      refreshToken: tokens.refreshToken,
    });
    return {
      user: getInfoData({
        fileds: ["_id", "username", "email", "roles"],
        object: foundUser,
      }),
      tokens,
    };
  };

  /*logout*/
  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log("Removed key store::", delKey);
    return delKey;
  };

  /*
    Check this token used?
  */
  static handleRefreshToken = async (refreshToken) => {
    //check xem token nay da duoc su dung chua
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    );
    //neu co
    if (foundToken) {
      //xem la user nao
      const { userId, email } = await verifyJWT(
        foundToken.refreshToken,
        foundToken.publicKey
      );

      //xoa tat ca token trong KeyStore
      await KeyTokenService.deleteKeyByUserId(userId);
      throw new ForbiddenError("Something went wrong!! Please relogin");
    }

    //neu chua co
    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) throw new AuthFailureError("User not registered");

    //verify token
    const { userId, email } = await verifyJWT(
      refreshToken,
      holderToken.publicKey
    );

    //check userId
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new AuthFailureError("User not registered");

    //create 1 cap moi
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });

    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: foundUser._id,
      publicKey: publicKey,
    });

    const tokens = await createTokenPair(
      {
        userId: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
      publicKeyString,
      privateKey
    );

    //Update Token
    await holderToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken, // đã được sử dụng
      },
    });

    return {
      user: {
        userId: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
      tokens,
    };
  };

  static login_sms = async ({ phone }) => {
    // 1 Kiểm tra user đăng nhập = sđt
    // console.log('in login user')
    // console.log(loginMethod, loginMethodValue, password)

    let foundUser = await userModel.findOne({ phone: phone }).lean();

    //Không tìm thấy úuer
    if (!foundUser) throw new BadRequestError("Authentication failed");

    //3 create private key, public key (private key used for syncing a token
    //and public key used for validation that token)
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });
    //create public key for decoding token
    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: foundUser._id,
      publicKey: publicKey,
    });

    //4
    const tokens = await createTokenPair(
      {
        userId: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
      publicKeyString,
      privateKey
    );

    //5
    await KeyTokenService.createKeyToken({
      userId: foundUser._id,
      publicKey: publicKey,
      refreshToken: tokens.refreshToken,
    });

    // const foundUserDB = await db.user.findOne({ user_sid: foundUser._id })
    return {
      user: getInfoData({
        fileds: ["_id", "username", "phone", "roles"],
        object: foundUser,
      }),
      tokens,
    };
  };
}

module.exports = AccessService;
