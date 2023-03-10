const form = document.querySelector("#form")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const data = new FormData(form)
    const object = { }

    data.forEach((value, key) => object[key] = value )

    try{
        const response = await fetch("/users/recover", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object)
        })

        const data = await response.json()

        console.log(data)
    }catch(error){
        console.error(error)
    }
})