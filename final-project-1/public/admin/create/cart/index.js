const formCreate = document.querySelector("#form-create")

formCreate.addEventListener("submit", async (event) => {
    event.preventDefault()

    try{
        await fetch("/api/carts", { method: "POST" })
    }catch(error){
        console.log(error)
    }
})