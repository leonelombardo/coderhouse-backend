const fs = require("fs");

const Users = require("../models/users.model");
const CustomError = require("../../classes/CustomError");
const { hashPassword } = require("../../utils/bcrypt.util");

class UsersDAO{
    constructor(){
        this.path = process.cwd() + "/src/fs/users.json"
    }

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

        if(user.role === "premium"){
            await Users.updateOne({ _id: id }, { role: "user" } );

            return user;
        }

        const documentTypes = [];

        user.documents.forEach(document => (document.type === "dni" || document.type === "address" || document.type === "account_status") && documentTypes.push(document.type));

        if(!documentTypes.includes("dni") || !documentTypes.includes("address") || !documentTypes.includes("account_status")) throw new CustomError({ status: 400, ok: false, response: "Finish processing your documentation."});

        const update = {...user._doc, role: user._doc.role === "user" ? "premium" : "user" };

        await Users.updateOne({ _id: id }, update);

        return update;
    }

    async uploadDocument(id, files){
        const user = await Users.findById(id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });
    
        if(!files.length) throw new CustomError({ status: 404, ok: false, response: "There are no documents to upload." });

        let documents = [...user._doc.documents];

        files.forEach(file => documents = documents.length ? [...documents, { type: file.document_type, reference: file.path }] : [{ type: file.document_type, reference: file.path }]);

        const updated = { ...user._doc, documents };

        await Users.updateOne({ _id: id }, updated);

        return documents;
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