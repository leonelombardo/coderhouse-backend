const passport = require("passport");
const { generateToken } = require("../utils/jwt.utils");
const CustomRouter = require("./CustomRouter");

class AuthRouter extends CustomRouter{
    init(){
        this.post("/login", passport.authenticate("login"), (req, res) => {
            if(!req.user) return res.error(400, "Something went wrong.");

            const token = generateToken(req.user);

            res.cookie("token", token, { httpOnly: true }).success(200, "Welcome back.");
        })
    }
}

module.exports = AuthRouter;