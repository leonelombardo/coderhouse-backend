const fs = require("fs");
const CustomError = require("../../classes/CustomError");
const { verifyPassword } = require("../../utils/bcrypt.util");

class AuthDAO{
    constructor(){
        this.users = process.cwd() + "/src/fs/users.json"
    }

    async login(body){
        const { email, password } = body;

        if(!email || !password) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });

        const response = await fs.promises.readFile(this.users);
        const users = JSON.parse(response);

        const user = users.find(user => user.email === email);

        if(!user) throw new CustomError({ status: 400, ok: false, response: "Invalid username or password." });

        if(!verifyPassword(password, user.password)) throw new CustomError({ status: 400, ok: false, response: "Invalid username or password." });

        return user;
    }
}

module.exports = AuthDAO;