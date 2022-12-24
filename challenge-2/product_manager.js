const fs = require("fs")

class ProductManager {
    constructor(path){
        this.products = []
        this.path = path
    }

    addProduct = async (object) => {
        const { title, description, price, thumbnail, code, stock } = object

        if([title, description, price, thumbnail, code, stock].some(x => x == null || x == null)){
            console.log("You should complete all fields.")
            return
        }else{
            const isCodeRepeated = this.products.find(product => product.code == object.code)

            if(isCodeRepeated){
                console.error("This code is already used.")
            }else{
                const products = await this.getProducts()
                products.push({...object, id: products.length})

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            }
        }
    }

    getProducts = async () => {
        if(fs.existsSync(this.path)){
            const response = await fs.promises.readFile(this.path, "utf8")
            const data = JSON.parse(response)
    
            return data
        }else{
            return []
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts()
        const foundProduct = products.find(product => product.id === id)

        if(foundProduct){
            console.log(foundProduct)
            return foundProduct
        }else{
            return console.error("Product not found.")
        }
    }

    updateProduct = async (id, object) => {
        const products = await this.getProducts()
        const product = await this.getProductById(id)

        if(object.id){
            console.log("Can't update ID.")
            return
        }

        const updatedProduct = {
            ...product,
            ...object
        }

        const updatedProducts = products.map(x => x.id === updatedProduct.id ? updatedProduct :  x)
        console.log(`Product ${updatedProduct.title} ${updatedProduct.description} updated.`)

        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null , "\t"))
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const updatedProducts = products.filter(x => x.id !== id && x)

        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, "\t"))
    }
}

const manager = new ProductManager("./users.json")