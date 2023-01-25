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