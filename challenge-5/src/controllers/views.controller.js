const { Router } = require("express")
const privateAccess = require("../middlewares/privateAccess")
const publicAccess = require("../middlewares/publicAccess")

const viewsController = Router()

viewsController.get("/", privateAccess, (req, res) => {
    
    const { first_name, last_name, email, role } = req.session.user

    const user = { first_name, last_name, email, role }

    res.render("profile.handlebars", { title: "Sessions | Profile", style: "profile.css", user } )
})

viewsController.get("/signup", publicAccess, (req, res) => {
    if(req.session.user) return res.redirect("/")

    res.render("signup.handlebars", { title: "Sessions | Sign Up", style: "signup.css" } )
})

viewsController.get("/login", publicAccess, (req, res) => {
    
    res.render("login.handlebars", { title: "Sessions | Log In", style: "login.css" } )
})

module.exports = viewsController