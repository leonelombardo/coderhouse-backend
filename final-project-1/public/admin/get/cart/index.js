const formGet = document.querySelector("#form-get")
const cartID = document.querySelector("#cart-id")
const modalContainer = document.querySelector("#modal-container")
const closeModalButton = document.querySelector("#close-modal")
const results = document.querySelector("#results")

formGet.addEventListener("submit", async (event) => {
    event.preventDefault()
    
    const id = cartID.value

    if(!id) return alert("Provide an ID.")

    try{
        const response = await fetch(`/api/carts/${id}`)
        const data = await response.json()
        const { error, products } = data

        if(error) return alert(data.response)

        products.length
            ? products.map(product => {
                return results.innerHTML += 
                    `<div class="product-card dark">
                        <div class="product-head">
                            <span class="product-name dark">${product.id ?? "Unknown"}</span>
                            <span class="product-category dark">Quantity: ${product.quantity ?? "No stock"}</span>
                        </div>
                    </div>`
                })
            : results.innerHTML += `<span class="product-description dark" style="text-align: center">This cart has no products</span>`

        modalContainer.style.display = "flex"
    }catch(error){
        alert(error)
    }
})

closeModalButton.addEventListener("click", () => {
    modalContainer.style.display = "none"
    results.innerHTML = ""
})