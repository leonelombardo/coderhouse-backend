const crypto = require("crypto");
const CustomError = require("../../classes/CustomError");
const { hashPassword } = require("../../utils/bcrypt.util");

class UsersDAO{
    constructor(){
        this.users = [];
    }

    async find(){
        return this.users;
    }

    async findById(id){
        const user = this.users.find(user => user.id === id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });

        return user;
    }

    async create(body){
        const { first_name, last_name, email, age, password } = body;

        if(!first_name || !last_name || !email || !age || !password) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });;

        const user = { id: crypto.randomUUID(), first_name, last_name, email, age, password: hashPassword(password), role: "user" };

        this.users.push(user);

        return "User created";
    }

    async deleteOne(id){
        const user = this.users.find(user => user.id === id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });
        
        this.users = this.users.filter(user => user.id !== id && user);
        
        return "User removed.";
    }

    async deleteMany(){
        this.users = [];

        return "All users were removed.";
    }
}

module.exports = UsersDAO;