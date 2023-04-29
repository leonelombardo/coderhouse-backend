const PRODUCTS_ERRORS = require("../errors/products.errors");

const errorHandler = (error, req, res, next) => {
    switch(error.code){
        case PRODUCTS_ERRORS.INVALID_TYPES:
            res.status(400).json({ status: 400, ok: false, response: error.name });
        break;
        case PRODUCTS_ERRORS.NOT_FOUND:
            res.status(400).json({ status: 400, ok: false, response: error.name });
        break;
        case PRODUCTS_ERRORS.OUT_OF_STOCK:
            res.status(400).json({ status: 400, ok: false, response: error.name  });
        break;
        case PRODUCTS_ERRORS.UNAVAILABLE:
            res.status(400).json({ status: 400, ok: false, response: error.name });
        break;
        default:
            res.status(500).json({ status: 500, ok: false, error: "Internal server error." });
        break; 
    }
}

module.exports = errorHandler;