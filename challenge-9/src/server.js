const express = require("express");
const router = require("./router/router");
const addLogger = require("./logger/winston.logger");

const app = express();

app.use(express.json());

app.use(addLogger);

router(app);

module.exports = app;