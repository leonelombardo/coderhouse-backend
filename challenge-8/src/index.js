const app = require("./server");

const { PORT } = require("./config/server.config");

app.listen(PORT, () => console.log(`server running at ${PORT}.`));