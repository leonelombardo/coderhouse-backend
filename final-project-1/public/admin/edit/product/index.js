const formUpdateProduct = document.querySelector("#form-update-product")
const inputID = document.querySelector("#product-id")
const inputTitle = document.querySelector("#title")
const inputCategory = document.querySelector("#category")
const inputDescription = document.querySelector("#description")
const inputPrice = document.querySelector("#price")
const inputStock = document.querySelector("#stock")
const inputCode = document.querySelector("#code")

formUpdateProduct.addEventListener("submit", async (event) => {
    event.preventDefault()
    
    const id = inputID.value
    const title = inputTitle.value
    const category = inputCategory.value
    const description = inputDescription.value
    const price = inputPrice.value
    const stock = inputStock.value
    const code = inputCode.value

    if(!id || !title || !category || !description || !code) return alert("Please complete all fields.")
    if(price === null || price === undefined) return alert("Price must be a number.")
    if(stock === null || stock === undefined) return alert("Stock must be a number.")

    const product = {
        title,
        description,
        category,
        price,
        stock,
        code
    }

    try{
        const response = await fetch(`/api/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        const error = { data }

        if(error) return alert(error)

        alert(`Product ${id} updated.`)
    }catch(error){
        alert(error)
    }
})