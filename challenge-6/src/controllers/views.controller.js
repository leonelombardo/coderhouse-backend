const { Router } = require("express")

const privateAccess = require("../middlewares/privateAccess.js")
const publicAccess = require("../middlewares/publicAccess.js")

const viewsController = Router()

viewsController.get("/", privateAccess, (req, res) => {
    const { first_name, last_name, age, email, role } = req.session.user
    const user = { first_name, last_name, age, email, role }

    res.status(200).render("profile.handlebars", { style: "profile.css", title: "C21 | Profile", user })
})

viewsController.get("/login", publicAccess, (req, res) => {
    res.status(200).render("login.handlebars", { style: "main.css", title: "C21 | Log In" })
})

viewsController.get("/signup", publicAccess, (req, res) => {
    res.status(200).render("signup.handlebars", { style: "main.css", title: "C21 | Sign Up" })
})

viewsController.get("/recover-password", publicAccess, (req, res) => {
    res.status(200).render("recover-password.handlebars", { style: "main.css", title: "C21 | Recover password" })
})

viewsController.get("/login-failed", publicAccess, (req, res) => {
    res.status(200).render("login-failed.handlebars", { style: "main.css", title: "C21 | Log In failed"})
})

viewsController.get("/signup-failed", publicAccess, (req, res) => {
    res.status(200).render("signup-failed.handlebars", { style: "main.css", title: "C21 | Sign Up failed"})
})

module.exports = viewsController