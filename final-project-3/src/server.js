const express = require("express");
const router = require("./router");
const errorHandler = require("./endwares/errorHandler");

const app = express();

app.use(express.json());

router(app);

app.use(errorHandler);

module.exports = app;