const form = document.querySelector("#form")

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const data = new FormData(form)
    const object = { }

    data.forEach((value, key) => object[key] = value)

    try{
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object)
        })

        if(response.ok) return window.location.replace(response.url)

        const data = await response.json()

        console.log(data)
    }catch(error){
        console.error(error)
    }
})