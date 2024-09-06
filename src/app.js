require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//init middlewares
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//set headers for sending payload
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

//init db
require("./v1/dbs/init.mongo");
//cron-jobs
require("./v1/cron-jobs/resetVerifyNumFirebase");

//init routes
app.use("/", require("./v1/routes"));

//handling errors
app.use((req, res, next) => {
  const error = new Error("Service Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: err.stack,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
