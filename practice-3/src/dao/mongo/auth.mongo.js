const Users = require("../models/users.model");
const CustomError = require("../../classes/CustomError");
const { verifyPassword } = require("../../utils/bcrypt.util");

class AuthDAO{
    async login(body){
        const { email, password } = body;

        if(!email || !password) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });

        const user = await Users.findOne({ email });

        if(!user) throw new CustomError({ status: 400, ok: false, response: "Invalid username or password." });

        if(!verifyPassword(password, user.password)) throw new CustomError({ status: 400, ok: false, response: "Invalid username or password." });

        return user;
    }
}

module.exports = AuthDAO;