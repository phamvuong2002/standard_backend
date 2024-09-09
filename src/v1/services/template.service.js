"use strict";

const { TEMPLATE_STATUS } = require("../const");
const { BadRequestError } = require("../core/error.response");
const templateModel = require("../models/template.model");
const { htmlEmailAccess } = require("../templates/access_email_template");
const templateFactory = require("./templateFactory.service");

class Template {
  // new template
  static newTemplate = async ({ tem_name, tem_id }) => {
    //1. check if template exists
    const foundTemplate = await Template.findTemplateByName({
      tem_name,
    });
    if (foundTemplate) {
      throw new BadRequestError("Template name is existed");
    }

    //2. Lấy template từ factory
    const template = templateFactory.getTemplateById(tem_id);

    //3. create a new template
    const newTemplate = await templateModel.create({
      tem_id: template.tem_id,
      tem_name: template.tem_name,
      tem_html: template.tem_html,
    });
    return newTemplate;
  };

  // get template
  static getTemplate = async ({ tem_name }) => {
    const foundTemplate = await templateModel.findOne({
      tem_name,
    });
    if (!foundTemplate) {
      throw new BadRequestError("Template is not found");
    }
    if (foundTemplate.tem_status === TEMPLATE_STATUS.INACTIVE) {
      throw new BadRequestError("Template is inactive");
    }
    return foundTemplate;
  };

  // find template by name
  static findTemplateByName = async ({
    tem_name,
    select = { tem_id: 1, tem_name: 1, tem_status: 1, tem_html: 1 },
  }) => {
    const template = await templateModel
      .findOne({
        tem_name,
      })
      .select(select)
      .lean();
    return template;
  };
}

module.exports = Template;
