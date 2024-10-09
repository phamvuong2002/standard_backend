"use strict";
const { createContainer, Lifetime, asClass } = require("awilix");
const path = require("path");
const { toCamelCase } = require("../utils/toCamelCase");

const container = createContainer();

// Tự động load các services, repositories và controllers
container.loadModules(
  [
    ["services/*.js", { register: asClass, lifetime: Lifetime.SCOPED }],
    ["repositories/*.js", { register: asClass, lifetime: Lifetime.SCOPED }],
    ["controllers/*.js", { register: asClass, lifetime: Lifetime.SCOPED }],
  ],
  {
    cwd: path.resolve(__dirname, "../"), // Đường dẫn tới root project
    formatName: (name) => toCamelCase(name), // Sử dụng hàm toCamelCase để chuyển đổi tên
  }
);
// Thêm log để kiểm tra các registration trong container
console.log(container.registrations);

module.exports = container;
