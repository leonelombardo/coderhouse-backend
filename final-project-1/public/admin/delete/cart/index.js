const formDelete = document.querySelector("#form-delete")
const cartId = document.querySelector("#cart-id")

formDelete.addEventListener("submit", async (event) => {
    event.preventDefault()

    const { value } = cartId
    
    try{
        await fetch(`/api/carts/${value}`, { method: "DELETE" })
    }catch(error){
        console.error(error)
    }
})