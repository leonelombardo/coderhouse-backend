const formCreate = document.querySelector("#form-create")
const titleInput = document.querySelector("#title")
const categoryInput = document.querySelector("#category")
const descriptionInput = document.querySelector("#description")
const priceInput = document.querySelector("#price")
const stockInput = document.querySelector("#stock")
const codeInput = document.querySelector("#code")
const thumbnailsInput = document.querySelector("#thumbnails")
const statusRadios = document.getElementsByName("status")

formCreate.addEventListener("submit", async (event) => {
    event.preventDefault()

    const title = titleInput.value
    const category = categoryInput.value
    const description = descriptionInput.value
    const price = priceInput.value
    const stock = stockInput.value
    const code = codeInput.value
    const thumbnails = thumbnailsInput.value.split(",")
    let status

    statusRadios.forEach(radio => {
        const { checked, value } = radio
        
        if(checked){
            radio.setAttribute("checked", true)

            if(value === "true") status = true
            if(value === "false") status = false
        }else{
            radio.removeAttribute("checked")
        }
    })

    if(!title || !category || !description || !code || !thumbnails) return alert("Please complete all fields.")
    if(price === null || price === undefined) return alert("Price must be a number.")
    if(stock === null || stock === undefined) return alert("Stock must be a number.")
    if(status !== true && status !== false) return alert("Status must be boolean.")

    const product = {
        title,
        category,
        description,
        price,
        stock,
        code,
        status,
        thumbnails
    }

    try{
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        const data = await response.json()
        const { error } = data

        if(error) return alert(data.response)

        alert(`Product ${product.title} created.`)
    }catch(error){
        alert(error)
    }
})