const express = require("express");
const router = require("./router");
const connectMongo = require("./db/mongo.db");

const app = express();

app.use(express.json());

connectMongo();
router(app);

module.exports = app;