const formDelete = document.querySelector("#form-delete")
const productId = document.querySelector("#product-id")

formDelete.addEventListener("submit", async (event) => {
    event.preventDefault()

    const { value } = productId
    
    try{
        const response = await fetch(`/api/products/${value}`, { method: "DELETE" })
        const data = await response.json()
        const { error } = data

        if(error) return alert(data.response)

        alert(`Product ${value} deleted.`)
    }catch(error){
        alert(error)
    }
})