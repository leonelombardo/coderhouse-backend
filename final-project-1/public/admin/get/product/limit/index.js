const formGet = document.querySelector("#form-get")
const inputLimit = document.querySelector("#limit")
const modalContainer = document.querySelector("#modal-container")
const closeModalButton = document.querySelector("#close-modal")
const results = document.querySelector("#results")

formGet.addEventListener("submit", async (event) => {
    event.preventDefault()
    
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    const limit = inputLimit.value

    if(Number.isNaN(+limit)) return alert("Limit must be a number.")
    if(!limit || Number(limit) === 0) return alert("Limit must be greater than 0.")

    try{
        const response = await fetch(`/api/products/?limit=${limit}`)
        const data = await response.json()
        const { error } = data

        if(error) return alert(data.response)

        data.map(product => {
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

        modalContainer.style.display = "flex"
    }catch(error){
        alert(error)
    }
})

closeModalButton.addEventListener("click", () => {
    modalContainer.style.display = "none"
    results.innerHTML = ""
})