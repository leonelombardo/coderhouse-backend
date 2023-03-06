const { Router } = require("express")
const UsersManager = require("../dao/managers/users.manager")

const usersController = Router()
const usersManager = new UsersManager()

usersController.post("/", async (req, res, next) => {
    try{
        const response = await usersManager.create(req.body)

        res.status(response.status).json(response)
    }catch(error){
        next(error)
    }
})

module.exports = usersController