class ProductManager {
    constructor(){
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if([title, description, price, thumbnail, code, stock].some(x => x == undefined || x == null)){
            console.log("You should complete all fields.")
            return
        }else{
            const isCodeRepeated = this.products.find(product => product.code == code)

            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: this.products.length
            }

            if(isCodeRepeated){
                console.error("This code is already used.")
            }else{
                this.products.push(product)
            }
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const isProductFound = this.products.find(product => product.code === id)

        if(isProductFound){
            return console.log(isProductFound)
        }else{
            return console.error("Product not found.")
        }
    }
}

const manager = new ProductManager()

manager.addProduct("Ferrari", "458", 499, "No", 0, 50)
manager.addProduct("Porsche", "911", 299, "No", 1, 50)
manager.addProduct("Fiat", "500", 499, "No", 0, 50)
manager.addProduct("Tesla", "Roadster", 499, "No", 3, 50)
manager.addProduct("Chevrolet", "Corvette", 499, "No", 4, 50)
manager.addProduct("Lamborghini", "Aventador", 899, "No", 0, 50)