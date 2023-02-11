import fs from "fs"

export class FileManager{
    constructor(path){
        this.path = `${process.cwd()}/src/json/${path}`
    }

    async getData(){
        if(!fs.existsSync(this.path)) return { status: 404, ok: false, response: `Resource ${this.path} doesn't exist.` }

        try{
            const response = await fs.promises.readFile(this.path)

            if(!response.length) return { status: 404, ok: false, response: "No carts." }

            const data = JSON.parse(response)

            return { status: 200, ok: true, response: data }
        }catch{
            return { status: 500, ok: false, response: "Internal server error." }
        }
    }
}