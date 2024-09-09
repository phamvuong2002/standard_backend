"use strict";
const fs = require("fs");
const path = require("path");
const { BadRequestError } = require("../core/error.response");

class TemplateFactory {
  constructor() {
    this.templates = {};
    this.loadTemplates();
  }

  loadTemplates() {
    // Lấy đường dẫn đến folder email_templates
    const templatesDir = path.resolve(
      __dirname,
      "../templates/email_templates"
    );
    fs.readdirSync(templatesDir).forEach((file) => {
      const template = require(path.join(templatesDir, file));
      this.templates[template.tem_id] = template;
    });
  }

  getTemplateById(tem_id) {
    const template = this.templates[tem_id];
    if (!template) {
      throw new BadRequestError(`Template with ID ${tem_id} not found`);
    }
    return template;
  }
}

module.exports = new TemplateFactory();
