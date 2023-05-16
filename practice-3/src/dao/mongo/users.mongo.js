const Users = require("../models/users.model");
const CustomError = require("../../classes/CustomError");
const { hashPassword } = require("../../utils/bcrypt.util");

class UsersDAO{
    async find(){
        return await Users.find();
    }

    async findById(id){
        const user = await Users.findById(id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });

        return user;
    }

    async create(body){
        const { first_name, last_name, email, age, password } = body;

        if(!first_name || !last_name || !email || !age || !password) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });;

        const user = { first_name, last_name, email, age, password: hashPassword(password), role: "user" };

        const response = await Users.create(user);

        return "User created.";
    }

    async switchRole(id){
        const user = await Users.findById(id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });

        const update = {...user._doc, role: user._doc.role === "user" ? "premium" : "user" };

        await Users.updateOne({ _id: id }, update);

        return update;
    }

    async deleteOne(id){
        const user = await Users.findById(id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });
        
        await Users.deleteOne({ _id: id });
        
        return "User removed.";
    }

    async deleteMany(){
        const response = await Users.deleteMany();

        return "All users were removed.";
    }
}

module.exports = UsersDAO;