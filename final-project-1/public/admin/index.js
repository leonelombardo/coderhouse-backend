const modalContainer = document.querySelector("#modal-container")
const getProductsButton = document.querySelector("#get-products")
const getCartsButton = document.querySelector("#get-carts")
const postCartButton = document.querySelector("#post-cart")
const closeModalButton = document.querySelector("#close-modal")
const results = document.querySelector("#results")

closeModalButton.addEventListener("click", () => {
    modalContainer.style.display = "none"
    results.innerHTML = ""
})

getProductsButton.addEventListener("click", async () => {
    try{
        const response = await fetch("/api/products")
        
        if(!response.ok) return console.error("Something went wrong.")

        const products = await response.json()

        modalContainer.style.display = "flex"

        products.length
            ? products.map(product => {
                results.innerHTML += 
                    `<div class="product-card dark">
                        <div class="product-head">
                            <span class="product-id dark">${product.id ?? "Unknown"}</span>
                            <div class="product-header dark">
                                <h4 class="product-name dark">${product.title ?? "No name"}</h4>
                                <p class="product-category dark">${product.category ?? "No category"}</p>
                            </div>
                            <p class="product-description dark">${product.description ?? "No description"}</p>
                        </div>
                        <div class="product-data">
                            <span class="product-price dark">$${product.price ?? "No price"}</span>
                            <span class="product-stock dark">Stock: ${product.stock ?? "No stock"}</span>
                            <span class="product-code dark">Product code: ${product.code ?? "No product code"}</span>
                        </div>
                    </div>`
            })
            : results.innerHTML += `<span class="product-description dark" style="text-align: center">There are no products</span>`

    }catch(error){
        alert(`Error: ${error}`, "error")
    }
})

getCartsButton.addEventListener("click", async () => {
    try{
        const response = await fetch("/api/carts")
        
        if(!response.ok) return console.error("Something went wrong.")

        const carts = await response.json()

        modalContainer.style.display = "flex"

        carts.map(cart => {
            results.innerHTML += 
                `<div class="product-card dark">
                    <span class="product-id dark">${cart.id ?? "Unknown"}</span>
                    <h4 class="product-name dark">Products<h4/>
                    <div class="dark" style="display: flex; flex-direction: column;">
                        ${
                            
                            cart.products.length
                                ? cart.products.map(product => {
                                    return `<span class="product-category dark">${product.id ?? "No product"}</span>`
                                }).join("")
                                : `<span class="product-description dark">This cart has no products</span>`
                        }
                    </div>
                </div>`
        })
    }catch(error){
        alert(error)
    }
})

postCartButton.addEventListener("click", async () => {
    try{
        await fetch("/api/carts", { method: "POST" })
    
        alert("Cart created.")
    }catch(error){
        alert(error)
    }
})