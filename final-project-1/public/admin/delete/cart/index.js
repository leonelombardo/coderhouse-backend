const formDelete = document.querySelector("#form-delete")
const cartId = document.querySelector("#cart-id")

formDelete.addEventListener("submit", async (event) => {
    event.preventDefault()

    const { value } = cartId
    
    try{
        const response = await fetch(`/api/carts/${value}`, { method: "DELETE" })
        const data = await response.json()
        const { error } = data

        if(error) return alert(data.response)

        alert(`Cart ${value} deleted.`)
    }catch(error){
        alert(error)
    }
})