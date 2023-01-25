const socket = io()
const formPost = document.querySelector("#form-post")
const formDelete = document.querySelector("#form-delete")
const productId = document.querySelector("#product-id")
const title = document.querySelector("#title")
const description = document.querySelector("#description")
const price = document.querySelector("#price")
const code = document.querySelector("#code")
const bothStatus = document.getElementsByName("status")
const stock = document.querySelector("#stock")
const thumbnail = document.querySelector("#thumbnail")
const products = document.querySelector("#products")

formPost.addEventListener("submit", async (event) => {
    event.preventDefault()

    const thumbnailPlaceholder = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
    let status
    
    bothStatus.forEach(option => option.checked ? option.value === "true" ? status = true : status = false : status = true)

    if(status !== true && status !== false) return alert("Status must be true or false.")
    if(!title.value || !description.value || !code.value || !thumbnail.value) return alert("Please complete all fields.")
    if(stock.value === undefined || stock.value === null || !Number(stock.value)) return alert("Stock must be a number.")
    if(price.value === undefined || price.value === null || !Number(price.value)) return alert("Price must be a number.")
    if(!/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(thumbnail.value)) thumbnail.value = thumbnailPlaceholder

    const product = {
        title: title.value || "No title",
        description: description.value || "No description",
        price: price.value || "No price",
        code: code.value || "No product code",
        status: status,
        stock: stock.value || "No stock",
        thumbnails: thumbnail.value
    }

    try{
        const response = await fetch("/realtimeproducts", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(product)
        })

        const postProductResponse = await response.json()
        const { error } = postProductResponse

        if(error) return alert(postProductResponse.response)

        title.value = ""
        description.value = ""
        price.value = ""
        code.value = ""
        stock.value = ""
        thumbnail.value = ""

        alert("Product added.")
    }catch(error){
        console.error(error)
    }
})

formDelete.addEventListener("submit", async (event) => {
    event.preventDefault()

    const id = productId.value

    if(!id) return alert("Please provide an ID.")

    try{
        const response = await fetch(`/product/${id}`, {
            method: "DELETE"
        })
        const product = await response.json()
        const { error } = product

        if(error) return alert(product.response)
        
        productId.value = ""
        
        alert("Product deleted.")
    }catch(error){
        alert("Something went wrong, check console for more information.")
        console.error(error)
    }
})

socket.on("new-product", data => {
    products.innerHTML = ""

    createHtml(data)
})

socket.on("product-deleted", data => {
    products.innerHTML = ""

    createHtml(data)
})

export const createHtml = (data) => {
    return data.length
    ? data.map(product => {
        products.innerHTML += `
            <div class="product-card">
                <img src="${product.thumbnails}" alt="${product.title}" class="product-card_image"/>
                <span class="text-xs opacity-50">${product.id}</span>
                <h2 class="product-card_title">${product.title}</h2>
                <p class="text-sm product-card_description">${product.description}</p>
                <div class="product-card_data">
                <span class="text-sm opacity-50">PRICE: $${product.price}</span>
                    <span class="text-sm opacity-50">CODE: ${product.code}</span>
                    <span class="text-sm opacity-50">STOCK: ${product.stock}</span>
                    <span class="text-sm opacity-50">STATUS: ${product.status}</span>
                </div>
            </div>
        `            
    })
    : products.innerHTML += `
            <div class="product-card">
                <img src="${data.thumbnails}" alt="${data.title}" class="product-card_image"/>
                <span class="text-xs opacity-50">${data.id}</span>
                <h2 class="product-card_title">${data.title}</h2>
                <p class="text-sm product-card_description">${data.description}</p>
                <div class="product-card_data">
                    <span class="text-sm opacity-50">PRICE: $${data.price}</span>
                    <span class="text-sm opacity-50">CODE: ${data.code}</span>
                    <span class="text-sm opacity-50">STOCK: ${data.stock}</span>
                    <span class="text-sm opacity-50">STATUS: ${data.status}</span>
                </div>
            </div>
        `       
}