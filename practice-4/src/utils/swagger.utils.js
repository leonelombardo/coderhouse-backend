const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentation challenge.",
            description: "No description because me and my work both are indescribable."
        }
    },
    apis: [process.cwd() + "/docs/*.yaml"]
}

const swaggerSpecs = swaggerJSDoc(options);


module.exports = swaggerSpecs;