const { Router } = require("express")
const passport = require("passport")
const AuthManager = require("../dao/managers/auth.manager.js")

const authController = Router()

const Auth = new AuthManager()

authController.post("/login", passport.authenticate("login", { failureRedirect: "/login-failed" }), (req, res) => {
    if(!req.user) return res.status(401).json({ status: 401, ok: false, response: "Log In failed." })

    const { first_name, last_name, age, email } = req.user
    const role = email === "adminCoder@coder.com" ? "admin" : "user"

    req.session.user = { first_name, last_name, age, email, role }

    res.status(200).redirect("/")
})

authController.get("/github", passport.authenticate("github", { scope: [ "user: email" ]}), (req, res) => {})

authController.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
    if(!req.user) return res.status(401).json({ status: 401, ok: false, response: "Log In failed." })

    const { first_name, last_name, age, email } = req.user
    const role = email === "adminCoder@coder.com" ? "admin" : "user"

    req.session.user = { first_name, last_name, age, email, role }

    res.redirect('/')
})

authController.get("/logout", (req, res) => {
    req.session.destroy()

    res.redirect("/login")
})

module.exports = authController