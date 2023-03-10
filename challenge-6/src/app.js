const app = require("./index.js")

const { PORT }= require("./config/index.config.js")

app.listen(PORT, () => console.log(`Server running at ${PORT}.`))