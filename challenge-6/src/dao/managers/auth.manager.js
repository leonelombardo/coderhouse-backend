const CustomError = require("../../utils/CustomError.js")
const userModel = require("../models/user.model.js")
const { validatePassword } = require("../../utils/bcrypt.utils.js")

class AuthManager{
    async login(body){
        const { email, password } = body

        if(!email || !password) throw new CustomError({ status: 400, ok: false, response: "Provide both email and password." })

        const user = { email, password }

        const found = await userModel.findOne({ email })

        if(!found) throw new CustomError({ status: 401, ok: false, response: "Email and password doesn't match." })

        if(!validatePassword(password, found.password)) throw new CustomError({ status: 401, ok: false, response: "Email and password doesn't match." })

        return { status: 200, ok: true, user: { first_name: found.first_name, last_name: found.last_name, age: found.age, email: found.email } }
    }
}

module.exports = AuthManager