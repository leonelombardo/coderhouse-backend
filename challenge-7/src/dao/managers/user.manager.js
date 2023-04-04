const userModel = require("../models/user.model");
const { hashPassword } = require("../../utils/bcrypt.utils");
const CustomError = require("../../classes/CustomError");

class UserManager{
    async find(){
        const users = await userModel.find();

        return users.map(user => ({ id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, age: user.age }));
    }

    async create({ first_name, last_name, email, password, age}){
        if(!first_name || !last_name || !email || !password || !age) throw new CustomError({ status: 400, ok: false, response: "Missing fields." });

        const repeated = await userModel.find({ email });

        if(repeated.length) throw new CustomError({ status: 400, ok: false, response: "Email already used." })

        const user = { first_name, last_name, email, password: hashPassword(password), age}

        const response = await userModel.create(user);

        return response;
    }
}

module.exports = UserManager;