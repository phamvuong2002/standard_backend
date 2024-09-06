"use strict";

const { SuccessResponse } = require("../core/success.response");
const Template = require("../services/template.service");

class EmailController {
  newTemplate = async (req, res, next) => {
    new SuccessResponse({
      message: "new template is created",
      metadata: await Template.newTemplate(req.body),
    }).send(res);
  };
}

module.exports = new EmailController();
