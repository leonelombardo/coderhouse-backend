const { Router } = require("express");

const { AuthDAO }= require("../factory/index");
const { generateToken, isValidToken, validateToken } = require("../utils/jwt.utils");
const { verifyPassword } = require("../utils/bcrypt.util");
const sendEmail = require("../utils/email.utils");
const { PORT } = require("../config/server.config");

const authController = Router();
const Auth = new AuthDAO();

authController.post("/login", async (req, res, next) => {
    try{
        const response = await Auth.login(req.body);

        const token = generateToken(response);

        res.cookie("token", token, { httpOnly: true }).status(200).json({ status: 200, ok: true, response, token });
    }catch(error){
        next(error);
    }
})

authController.get("/password/restore", validateToken, async (req, res, next) => {
    const { to } = req.body;

    if(!to) return res.status(400).json({ status: 400, ok: false, response: "Invalid request." });

    const token = generateToken(to);

    try{
        const response = await sendEmail(
            to,
            "Restore password.",
            `
            <img src="https://cdn-icons-png.flaticon.com/512/9258/9258190.png" style="width: 125px; height: 125px;"/>
            <p style="text-align: center;">
                Access to <a href="https://localhost:${PORT}/api/auth/password/restore/confirm/${token}" target="_blank">this link</a> to restore your password.<br/>
                Remember that you only have 1 hour before token expires.<br/>
                Please don't reply this email.
            </p>
            <span style="text-align: center; color: #d9d9d9">www.fakeproject.js</span>
            `
        );

        res.status(200).json({ status: 200, ok: false, response: "Email sent." });
    }catch(error){
        next(error);
    }
})

authController.post("/password/restore/:token", validateToken, async (req, res, next) => {
    const { password } = req.body;    
    const { token } = req.params;

    if(!password) return res.status(400).json({ status: 400, ok: false, response: "Invalid request." });

    if(verifyPassword(password, req.user.password)) return res.status(400).json({ status: 400, ok: false, response: "Password can't be equal to current password."});

    try{
        if(!isValidToken(token)) return res.status(400).json({ status: 400, ok: false, response: "Invalid token." });
        
        res.status(200).json({ status: 200, ok: true, response: token });
    }catch(error){
        next(error);
    }
})

module.exports = authController;