const express = require("express")
const session = require("express-session")
// const FileStore = require("session-file-store")
const MongoStore = require("connect-mongo")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")

const errorHandler = require("./middlewares/errorHandler")
const router = require("./router/router")
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_CLUSTER } = require("./config/db.config")

const app = express()
// const FileStorage = FileStore(session)

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(session({
    // store: new FileStorage({ path: "./sessions", ttl: 15, retries: 0 }),
    store: new MongoStore({
        mongoUrl: `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/class-19?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 30
    }),
    secret: "test",
    resave: false,
    saveUninitialized: false
}))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/class-19?retryWrites=true&w=majority`)
    .then(response => console.log("MongoDB connected."))
    .catch(error => console.log(error))

router(app)

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server running at ${PORT}.`))