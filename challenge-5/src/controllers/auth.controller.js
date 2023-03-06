const { Router } = require("express")
const AuthManager = require("../dao/managers/auth.manager")

const authController = Router()
const authManager = new AuthManager()

authController.post("/login", async (req, res, next) => {
    try{
        const response = await authManager.login(req.body)
        const role = response.response.email === "adminCoder@coder.com" ? "admin" : "user"

        req.session.user = {
            ...response.response,
            role
        }
        
        res.redirect("/")
    }catch(error){
        next(error)
    }
})

authController.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).json({ status: 500, ok: false, response: "Internal server error." })
    })

    res.redirect("/")
})

module.exports = authController