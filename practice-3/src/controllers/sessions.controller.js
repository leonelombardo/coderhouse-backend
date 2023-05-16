const { Router } = require("express");

const { validateToken } = require("../utils/jwt.utils");
const UserDTO = require("../dto/user.dto");

const sessionsController = Router();

sessionsController.get("/current", validateToken, async (req, res, next) => {
    if(!req.user) return res.status(401).json({ status: 401, ok: false, response: "Unauthorized." });

    try{
        const response = UserDTO(req.user);

        res.status(200).json({ status: 200, ok: true, response });
    }catch(error){
        next(error);
    }
})

module.exports = sessionsController;