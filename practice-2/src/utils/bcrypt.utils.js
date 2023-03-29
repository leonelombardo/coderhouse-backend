const bcrypt = require("bcrypt");

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const validatePassword = (password, hashed) => bcrypt.compareSync(password, hashed);

module.exports = { hashPassword, validatePassword }