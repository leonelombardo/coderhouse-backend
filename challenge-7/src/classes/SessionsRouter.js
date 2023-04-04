const passport = require("passport");
const CustomRouter = require("./CustomRouter");

class SessionsRouter extends CustomRouter{
    init(){
        this.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
            res.success(200, req.user)
        })
    }
}

module.exports = SessionsRouter;