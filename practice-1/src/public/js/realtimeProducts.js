const socket = io()
const formPost = document.querySelector("#form-post")
const formDelete = document.querySelector("#form-delete")
const productId = document.querySelector("#product-id")
const title = document.querySelector("#title")
const description = document.querySelector("#description")
const category = document.querySelector("#category")
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
    if(!title.value || !description.value || !category.value || !code.value || !thumbnail.value) return alert("Please complete all fields.")
    if(stock.value === undefined || stock.value === null || !Number(stock.value)) return alert("Stock must be a number.")
    if(price.value === undefined || price.value === null || !Number(price.value)) return alert("Price must be a number.")
    if(!/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(thumbnail.value)) thumbnail.value = thumbnailPlaceholder

    const product = {
        title: title.value || "No title",
        description: description.value || "No description",
        category: category.value || "No category",
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
        const { ok } = postProductResponse

        if(!ok) return alert(postProductResponse.response)

        title.value = ""
        description.value = ""
        category.value = ""
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
        const response = await fetch(`/${id}`, {
            method: "DELETE"
        })
        const product = await response.json()
        const { ok } = product

        if(!ok) return alert(product.response)
        
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

const createHtml = (data) => {
    return data.length
    ? data.map(product => {
        products.innerHTML += `
            <li class="product-card">
                <img class="product-image" src="${product.thumbnails}"/>
                <span class="product-id">${product.id}</span>
                <div style="display: flex; flex-direction: column; gap: 4px; width: 100%">
                    <h2 class="product-title">${product.title}</h2>
                    <span class="product-category">${product.category}</span>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 16px; flex: 1; width: 100%;">
                    <p class="product-description">${product.description}</p>
                    <span class="product-price">$${product.price}</span>
                </div>
            </li>
        `            
    })
    : products.innerHTML += `
            <li class="product-card">
                <img class="product-image" src="${data.thumbnails}"/>
                <span class="product-id">${data.id}</span>    
                <div style="display: flex; flex-direction: column; gap: 4px; width: 100%">
                    <h2 class="product-title">${data.title}</h2>
                    <span class="product-category">${data.category}</span>
                </div>
                <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 16px; flex: 1; width: 100%;">
                    <p class="product-description">${data.description}</p>
                    <span class="product-price">$${data.price}</span>
                </div>
            </li>
        `       
}