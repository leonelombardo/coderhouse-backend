import fs from "fs"

export class ProductManager{
    constructor(path){
        this.path = path
    }

    async getProducts(){
        if(fs.existsSync(this.path)){
            try{
                const response = await fs.promises.readFile(this.path, "utf-8")
                const data = JSON.parse(response)
                return data
            }catch(error){
                return console.log(error)
            }
        }

        return []
    }
}