"use strict";

const ROLES = {
  CLIENT: "10001", // USER
  WRITER: "10010", // ALLOW TO WRITE
  EDITOR: "10110", // ALLOW TO EDIT
  ADMIN: "10111", // ADMIN
};

const USER_STATUS = {
  INACTIVE: "inactive",
  ACTIVE: "active",
  PENDING: "pending",
};

const TEMPLATE_STATUS = {
  INACTIVE: "inactive",
  ACTIVE: "active",
};

module.exports = {
  ROLES,
  USER_STATUS,
  TEMPLATE_STATUS,
};
