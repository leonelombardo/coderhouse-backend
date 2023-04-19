const fs = require("fs");
const crypto = require("crypto");

const CustomError = require("../../classes/CustomError");
const { hashPassword } = require("../../utils/bcrypt.util");

class UsersDAO{
    constructor(){
        this.path = process.cwd() + "/src/fs/users.json"
    }

    async find(){
        const response = await fs.promises.readFile(this.path);
        const users = JSON.parse(response);
        
        return users;
    }

    async findById(id){
        const response = await fs.promises.readFile(this.path);
        const users = JSON.parse(response);
        const user = users.find(user => user.id === id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });

        return user;
    }

    async create(body){
        const { first_name, last_name, email, age, password } = body;

        if(!first_name || !last_name || !email || !age || !password) throw new CustomError({ status: 400, ok: false, response: "Invalid request." });;

        const user = { id: crypto.randomUUID(), first_name, last_name, email, age, password: hashPassword(password), role: "user" };

        const response = await fs.promises.readFile(this.path);
        const users = JSON.parse(response);

        if(!users.length) await fs.promises.writeFile(this.path, JSON.stringify([user], null, "\t"));
        else await fs.promises.writeFile(this.path, JSON.stringify([...users, user], null, "\t"));

        return "User created";
    }

    async deleteOne(id){
        const response = await fs.promises.readFile(this.path);
        const users = JSON.parse(response);
        const user = users.find(user => user.id === id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });
        
        const update = users.filter(user => user.id !== id && user);
       
        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"));

        return "User removed.";
    }

    async deleteMany(){
        await fs.promises.writeFile(this.path, JSON.stringify([]));

        return "All users were removed.";
    }
}

module.exports = UsersDAO;