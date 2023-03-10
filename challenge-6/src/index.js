const express = require("express")
const session = require("express-session")
const morgan = require("morgan")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const passport = require("passport")

const errorHandler = require("./middlewares/errorHandler.js")

const router = require("./router/router.js")
const initializePassport = require("./config/passport.config.js")
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_CLUSTER, MONGODB_DB } = require("./config/db.config.js")

const app = express()

app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(morgan("dev"))

app.use(session({
    store: new MongoStore({
        mongoUrl: `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/class-20?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15
    }),
    secret: "test",
    resave: false,
    saveUninitialized: false
}))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`)
    .then(response => console.log(`MongoDB connected.`))
    .catch(error => console.log(error))

router(app)
    
app.use(errorHandler)

module.exports = app