const { Router } = require("express");

const { AuthDAO }= require("../factory/index");
const { generateToken } = require("../utils/jwt.utils");

const authController = Router();
const Auth = new AuthDAO();

authController.post("/login", async (req, res, next) => {
    try{
        const response = await Auth.login(req.body);

        const token = generateToken(response);

        res.cookie("token", token, { httpOnly: true }).status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

module.exports = authController;