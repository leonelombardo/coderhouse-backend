const passport = require("passport");
const UserManager = require("../dao/managers/user.manager");
const CustomRouter = require("./CustomRouter");

const userManager = new UserManager();

class UsersRouter extends CustomRouter{
    init(){
        this.get("/", async (req, res, next) => {
            try{
                const response = await userManager.find();

                res.success(200, response);
            }catch(error){
                next(error);
            }
        })

        this.post("/", passport.authenticate("signup"), async (req, res, next) => {
            res.success(200, "User created.")
        })
    }
}

module.exports = UsersRouter;