"use strict";

const {
  env,
  db: { host, username, password, name },
} = require("../configs/config");
const mongoose = require("mongoose");

const encodedPassword = encodeURIComponent(password);
const encodedName = encodeURIComponent(name);
const connectionString = `mongodb+srv://${username}:${encodedPassword}@${host}/${encodedName}`;

const { countConnect } = require("../helpers/check.connect");

class Database {
  constructor() {
    this.connect();
  }

  //connect
  connect(type = "mongodb") {
    //dev
    if (env === "development") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true, shell: true });
    } else {
      mongoose.set("debug", true);
    }

    mongoose
      .connect(connectionString)
      .then((_) => {
        console.log("Connected mongoDB successfully");
        countConnect();
      })
      .catch((err) => {
        console.log(`Error connecting::${err.message}`);
      });
  }

  //instance
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
