import { notification } from "../utils/notification.js"

const messages = document.querySelector("#messages")
const messageForm = document.querySelector("#message-form")
const inputMessage = document.querySelector("#input-message")

const emailFormContainer = document.querySelector("#email-form-container")
const emailForm = document.querySelector("#email-form")
const inputEmail = document.querySelector("#input-email")
const emailError = document.querySelector("#email-error")

const socket = io()

emailForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const email = inputEmail.value

    if(email.trim().length <= 0) {
        emailError.style.display = "flex"
        emailError.innerHTML = `<i class="ph-warning-circle-bold"></i> Please type something`
    }else if(!/^\S+@\S+\.\S+$/.test(email)){
        emailError.style.display = "flex"
        emailError.innerHTML = `<i class="ph-warning-circle-bold"></i> Please enter a valid email`
    }
    else{
        emailError.style.display = "none"
        emailError.innerHTML = ""
        
        emailFormContainer.style.display = "none"
        
        socket.emit("email", email)

        inputMessage.focus()
    }
})

messageForm.addEventListener("submit", (event) => {
    event.preventDefault()
    
    const email = inputEmail.value
    const message = inputMessage.value

    if(email.trim().length <= 0) {
        notification("Users with no username can't chat here.")
        return
    }

    if(message.trim().length <= 0) return

    socket.emit("message", { email, message })

    inputMessage.value = ""
    
    window.scroll({ bottom: -100, behavior: "smooth" })
})

socket.on("load-messages", data => {
    messages.innerHTML = ""

    if(typeof(data) !== "object" || !data.length) return

    data.forEach(message => {
        messages.innerHTML += `
            <div class="message">
                <p class="message-username" style="${message.user === inputEmail.value && 'display: none'}">${message.user}</p>
                <span class="message-message">${message.message}</span>
            </div>
        `
    })
})

socket.on("user-connected", email => notification(`${email} joined to chat.`))

socket.on("new-message", data => {
    messages.innerHTML = ""

    data.forEach(message => {
        messages.innerHTML += `
            <div class="message ${message.user === inputEmail.value ? 'sender' : ''}">
            <p class="message-username" style="${message.user === inputEmail.value && 'display: none'}">${message.user}</p>
                <span class="message-message">${message.message}</span>
            </div>
        `
    })
})