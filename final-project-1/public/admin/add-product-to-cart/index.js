const formAddProductToCart = document.querySelector("#form-add-product-to-cart")
const inputCartID = document.querySelector("#cart-id")
const inputProductID = document.querySelector("#product-id")

formAddProductToCart.addEventListener("submit", async (event) => {
    event.preventDefault()

    const cartID = inputCartID.value
    const productID = inputProductID.value

    if(!cartID) return alert("Must provide a cart ID.")
    if(!productID) return alert("Must provide a product ID.")

    try{
        const productResponse = await fetch(`/api/products/${productID}`)
        
        if(!productResponse.ok) return alert("Product not found.")
        
        const product = await productResponse.json()
        const { id } = product

        const response = await fetch(`/api/carts/${cartID}/product/${id}`, { method: "POST" })
        const data = await response.json()
        const { error } = data

        if(error) return alert(data.response)

        alert(`Product ${id} added to cart ${cartID}.`)
    }catch(error){
        alert(error)
    }
})