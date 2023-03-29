const { app } = require("./index");
const { PORT } = require("./config/index.config");

app.listen(PORT, () => console.log(`Server running at port ${PORT}.`))