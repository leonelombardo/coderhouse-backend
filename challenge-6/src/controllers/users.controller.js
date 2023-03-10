const { Router } = require("express")
const passport = require("passport")
const UserManager = require("../dao/managers/user.manager.js")

const usersController = Router()
const User = new UserManager()

usersController.post("/", passport.authenticate("signup", { successRedirect: "/login", failureRedirect: "/signup-failed" }), (req, res) => {})

usersController.patch("/recover", async (req, res, next) => {
    try{
        const response = await User.updateOne(req.body)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

module.exports = usersController