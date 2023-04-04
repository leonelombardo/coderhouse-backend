const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const userModel = require("../dao/models/user.model");

const { hashPassword, validatePassword } = require("../utils/bcrypt.utils");

const { JWT_SECRET_KEY } = require("./jwt.config");
const cookieExtractor = require("../utils/cookieExtractor");

const initializePassport = () => {
    passport.use("signup", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
            const { first_name, last_name, age } = req.body;
            
            if(!first_name || !last_name || !age) return done({ status: 400, ok: false, response: "Missing fields." });
            
            try{
                const repeated = await userModel.find({ email: username });
    
                if(repeated.length) return done({ status: 400, ok: false, response: "Email already used." });
    
                const user = { first_name, last_name, email: username, password: hashPassword(password), age, role: "user" };
    
                const response = await userModel.create(user);
    
                done(null, response);
            }catch(error){
                done(error)
            }
        }
    ))

    passport.use("login", new LocalStrategy(
        { usernameField: "email" },
        async (username, password, done) => {
            try{
                const exists = await userModel.findOne({ email: username })
    
                if(!exists) done({ status: 400, ok: false, response: "Invalid email or password." })
            
                const validPassword = validatePassword(password, exists.password);
    
                if(!validPassword) done({ status: 400, ok: false, response: "Invalid email or password." });
    
                done(null, exists);
            }catch(error){
                done(error);
            }
        }
    ))

    passport.use("jwt", new JWTStrategy(
        { secretOrKey: JWT_SECRET_KEY, jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor])},
        async (jwt_payload, done) => {
            try{
                done(null, jwt_payload);
            }catch(error){
                done({ status: 400, ok: false, response: "Something went wrong." });
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const found = await userModel.findById(id)

        if(!found) return done(null, false)

        done(null, found)
    })
}

module.exports = initializePassport