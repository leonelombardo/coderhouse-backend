const formAddProductToCart = document.querySelector("#form-add-product-to-cart")
const inputCartID = document.querySelector("#cart-id")
const inputProductID = document.querySelector("#product-id")

formAddProductToCart.addEventListener("submit", async (event) => {
    event.preventDefault()

    const cartID = inputCartID.value
    const productID = inputProductID.value

    try{
        const response = await fetch(`/api/carts/${cartID}/product/${productID}`, { method: "POST" })
        const data = await response.json()
        const { error } = data

        if(error) return alert(data.response)

        alert(`Product ${productID} added to cart ${cartID}.`)
    }catch(error){
        alert(error)
    }
})