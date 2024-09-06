"use strict";
const _ = require("lodash");

const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

const replacePlaceholder = (template, params) => {
  Object.keys(params).forEach((k) => {
    const placehoder = `{{${k}}}`;
    template = template.replace(new RegExp(placehoder, "g"), params[k]);
  });
  return template;
};

module.exports = {
  getInfoData,
  replacePlaceholder,
};
