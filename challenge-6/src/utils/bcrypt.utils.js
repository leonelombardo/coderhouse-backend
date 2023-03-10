const bcrypt = require("bcrypt")

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const validatePassword = (password, encrypted) => bcrypt.compareSync(password, encrypted)

module.exports = {
    hashPassword,
    validatePassword
}