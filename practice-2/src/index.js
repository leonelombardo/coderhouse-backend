const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middlewares/errorHandler");
const initializePassport = require("./config/passport.config");

const { connect } = require("./db/index");
const { router } = require("./router/router");
const { JWT_SECRET_KEY } = require("./config/jwt.config");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(session({ secret: JWT_SECRET_KEY, resave: true, saveUninitialized: true }))

connect();

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

router(app);

app.use(errorHandler);

module.exports = { app }