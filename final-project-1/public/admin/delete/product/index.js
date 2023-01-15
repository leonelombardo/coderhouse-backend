const formDelete = document.querySelector("#form-delete")
const productId = document.querySelector("#product-id")

formDelete.addEventListener("submit", async (event) => {
    event.preventDefault()

    const { value } = productId
    
    try{
        await fetch(`/api/products/${value}`, { method: "DELETE" })
    }catch(error){
        console.error(error)
    }
})