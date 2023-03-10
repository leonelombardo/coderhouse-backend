require("dotenv").config()

const passport = require("passport")
const local = require("passport-local")
const GitHubStrategy = require("passport-github2")

const userModel = require("../dao/models/user.model.js")
const { hashPassword, validatePassword } = require("../utils/bcrypt.utils.js")

const LocalStrategy = local.Strategy

const PASSPORT_GITHUB_CLIENT_ID = process.env.PASSPORT_GITHUB_CLIENT_ID
const PASSPORT_GITHUB_CLIENT_SECRET = process.env.PASSPORT_GITHUB_CLIENT_SECRET

const initializePassport = () => {
    passport.use("signup", new LocalStrategy(
        { passReqToCallback: true ,usernameField: "email" },
        async (req, username, password, done) => {
            const { first_name, last_name, age } = req.body
    
            if(!first_name || !last_name || !age) return done("Missing fields.")
    
            try{
                const found = await userModel.findOne({ email: username })
    
                if(found) return done(null, false, { message: "Email already in use." })
    
                const user = { first_name, last_name, age, email: username, password: hashPassword(password) }
    
                const response = await userModel.create(user)

                done(null, response)
            }catch(error){
                done(error)
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

    passport.use("login", new LocalStrategy(
        { usernameField: "email" },
        async (username, password, done) => {
            try{
                const found = await userModel.findOne({ email: username })
                
                if(!found) return done({ status: 401, ok: false, response: "Email and password doesn't match." })

                const validPassword = await validatePassword(password, found.password)
                
                if(!validPassword) return done({ status: 401, ok: false, response: "Email and password doesn't match." })
                
                done(null, found)
            }catch(error){
                done(error)
            }
        }
    ))

    passport.use("github", new GitHubStrategy({
        clientID: PASSPORT_GITHUB_CLIENT_ID,
        clientSecret: PASSPORT_GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/github/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            const found = await userModel.findOne({ email: profile._json.email })
    
            if(found) return done(null, found)
    
            const user = {
                first_name: profile._json.name,
                last_name: "",
                age: 0,
                email: profile._json.email,
                password: ""
            }
    
            const response = await userModel.create(user)

            done(null, response)
        }catch(error){
            console.log(error)
            done(error)
        }
    }))
}

module.exports = initializePassport