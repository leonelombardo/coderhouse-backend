const jwt = require("jsonwebtoken");
const CustomError = require("../classes/CustomError");
const { JWT_SECRET_KEY } = require("../config/jwt.config");

const generateToken = user => jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: "15s" })

const validateToken = (req, res, next) => {
    const { authentication } = req.headers;

    if(!authentication) throw new CustomError({ status: 401, ok: false, response: "Invalid token." })

    const token = jwt.verify(authentication.split("").slice(1).join());

    jwt.verify(token, JWT_SECRET_KEY, (error, credentials) => {
        if(error) throw new CustomError({ status: 403, ok: false, response: "Unauthorized." });

        req.user = credentials.user;

        next();
    })
}

module.exports = { generateToken, validateToken }