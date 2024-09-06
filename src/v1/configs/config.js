"use strict";

const development = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    username: process.env.DEV_DB_USERNAME || "vuong_dev",
    password: process.env.DEV_DB_PASSWORD || "vuong_dev2002",
    name: process.env.DEV_DB_NAME || "app_dev",
  },
  mail: {
    aws_ses: {
      account: process.env.DEV_AWS_ACCESS_KEY,
      key: process.env.DEV_AWS_SECRET_KEY,
      region: "ap-southeast-1",
    },
    outlook: {
      email: process.env.DEV_OUTLOOK_AUTH_EMAIL,
      password: process.env.DEV_OUTLOOK_AUTH_PASS,
    },
    zoho: {
      email: process.env.DEV_ZOHO_AUTH_EMAIL,
      password: process.env.DEV_ZOHO_AUTH_PASS,
    },
  },
};

const production = {
  app: {
    port: process.env.PRO_APP_PORT || 3055,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    username: process.env.PRO_DB_USERNAME || "vuong_pro",
    password: process.env.PRO_DB_PASSWORD || "vuong_pro2002",
    name: process.env.PRO_DB_NAME || "app_pro",
  },
  mail: {
    aws_ses: {
      account: process.env.PRO_AWS_ACCESS_KEY,
      key: process.env.PRO_AWS_SECRET_KEY,
      region: "ap-southeast-1",
    },
    outlook: {
      email: process.env.PRO_OUTLOOK_AUTH_EMAIL,
      password: process.env.PRO_OUTLOOK_AUTH_PASS,
    },
    zoho: {
      email: process.env.PRO_ZOHO_AUTH_EMAIL,
      password: process.env.PRO_ZOHO_AUTH_PASS,
    },
  },
};

const config = { development, production };
const env = process.env.NODE_ENV || "dev";

console.log(`Running on Environment::${env} \n`, config[env]);
module.exports = config[env];
