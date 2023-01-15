const formCreate = document.querySelector("#form-create")
const titleInput = document.querySelector("#title")
const categoryInput = document.querySelector("#category")
const descriptionInput = document.querySelector("#description")
const priceInput = document.querySelector("#price")
const stockInput = document.querySelector("#stock")
const codeInput = document.querySelector("#code")

formCreate.addEventListener("submit", async (event) => {
    event.preventDefault()

    const title = titleInput.value
    const category = categoryInput.value
    const description = descriptionInput.value
    const price = priceInput.value
    const stock = stockInput.value
    const code = codeInput.value

    if(!title || !category || !description || !price || !stock || !code){
        alert("Please check if all fields are valid or completed.")
        return
    }

    const product = {
        title: title,
        category: category,
        description: description,
        price: price,
        stock: stock,
        code: code
    }

    console.log(product)

    try{
        await fetch("/api/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }catch(error){
        console.error(error)
    }
})