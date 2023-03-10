const form = document.querySelector("#form")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const data = new FormData(form)
    const object = { }

    data.forEach((value, key) => object[key] = value )

    try{
        const response = await fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object)
        })

        window.location.replace(response.url)
    }catch(error){
        console.log(error)
    }
})