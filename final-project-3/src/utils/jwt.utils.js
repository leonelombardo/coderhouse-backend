const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../config/jwt.config");

const generateToken = user => jwt.sign(user, JWT_SECRET_KEY);
const validateToken = (token, secret) => jwt.verify(token, secret);

module.exports = { generateToken, validateToken };