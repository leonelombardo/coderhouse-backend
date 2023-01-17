const formGet = document.querySelector("#form-get")
const productID = document.querySelector("#product-id")
const modalContainer = document.querySelector("#modal-container")
const closeModalButton = document.querySelector("#close-modal")
const results = document.querySelector("#results")

formGet.addEventListener("submit", async (event) => {
    event.preventDefault()
    
    const id = productID.value

    if(!id) return alert("Provide an ID.")

    try{
        const response = await fetch(`/api/products/${id}`)
        const data = await response.json()
        const { error } = data

        if(error) return alert(data.response)

        results.innerHTML += 
            `<div class="product-card dark">
                <div class="product-head">
                    <span class="product-id dark">${data.id ?? "Unknown"}</span>
                    <div class="product-header dark">
                        <h4 class="product-name dark">${data.title ?? "No name"}</h4>
                        <p class="product-category dark">${data.category ?? "No category"}</p>
                    </div>
                    <p class="product-description dark">${data.description ?? "No description"}</p>
                </div>
                <div class="product-data">
                    <span class="product-price dark">$${data.price ?? "No price"}</span>
                    <span class="product-stock dark">Stock: ${data.stock ?? "No stock"}</span>
                    <span class="product-code dark">Product code: ${data.code ?? "No product code"}</span>
                </div>
            </div>`

        modalContainer.style.display = "flex"
    }catch(error){
        alert(error)
    }
})

closeModalButton.addEventListener("click", () => {
    modalContainer.style.display = "none"
    results.innerHTML = ""
})