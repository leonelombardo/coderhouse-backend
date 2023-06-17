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

        const user = { id: crypto.randomUUID(), first_name, last_name, email, age, password: hashPassword(password), role: "user", cart: [], documents: [], last_connection: new Date().toLocaleString() };

        const response = await fs.promises.readFile(this.path);
        const users = JSON.parse(response);

        if(!users.length) await fs.promises.writeFile(this.path, JSON.stringify([user], null, "\t"));
        else await fs.promises.writeFile(this.path, JSON.stringify([...users, user], null, "\t"));

        return "User created";
    }

    async switchRole(id){
        const response = await fs.promises.readFile(this.path);
        const users = JSON.parse(response);
        
        const user = users.find(x => x.id === id);
        
        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });

        if(user.role === "premium"){
            const updated = {...user, role: user.role === "user" ? "premium" : "user" };
            const update = users.map(x => x.id === id ? updated : x);

            await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"))

            return updated;
        }

        const documentTypes = [];

        user.documents.forEach(document => (document.type === "dni" || document.type === "address" || document.type === "account_status") && documentTypes.push(document.type));

        if(!documentTypes.includes("dni") || !documentTypes.includes("address") || !documentTypes.includes("account_status")) throw new CustomError({ status: 400, ok: false, response: "Finish processing your documentation."})
        
        const updated = {...user, role: user.role === "user" ? "premium" : "user" };
        const update = users.map(x => x.id === id ? updated : x);

        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"))

        return updated;
    }

    async uploadDocument(id, files){
        const response = await fs.promises.readFile(this.path);
        const users = JSON.parse(response);
        const user = users.find(user => user.id === id);

        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found." });
    
        if(!files.length) throw new CustomError({ status: 404, ok: false, response: "There are no documents to upload." });

        let updated = { ...user };
        
        files.forEach(file => updated = {...updated, documents: [...updated.documents, { type: file.document_type, reference: file.path }] });

        const update = users.map(x => x.id === id ? updated : x);
        
        await fs.promises.writeFile(this.path, JSON.stringify(update, null, "\t"))

        return updated;
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