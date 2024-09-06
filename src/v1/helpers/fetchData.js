"use strict";

const { BadRequestError } = require("../core/error.response");

const axios = require("axios");

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    const result = response.data;
    if (result.status !== 200) {
      return [];
    } else {
      return result.metadata;
    }
  } catch (error) {
    throw new BadRequestError(
      `Fetch to recommdation server failed::${error?.code}`
    );
  }
};

module.exports = { fetchData };
