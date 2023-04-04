const { Router } = require("express");

class CustomRouter{
    constructor(){
        this.router = Router();
        this.init();
    }

    getRouter(){
        return this.router;
    }

    init(){}

    get(path, ...callbacks){
        this.router.get(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    post(path, ...callbacks){
        this.router.post(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    }
    
    patch(path, ...callbacks){
        this.router.patch(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    put(path, ...callbacks){
        this.router.put(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    delete(path, ...callbacks){
        this.router.delete(path, this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback => async (...params) => {
            try{
                callback.apply(this, params);
            }catch(error){
                params[1].status(500).json({ status: 500, ok: false, response: "Internal server error." });
            }
        })
    }

    generateCustomResponses(req, res, next){
        res.success = (status, response) => res.status(status).json({ status, ok: true, response });
        res.error = (status, response) => res.status(status).json({ status, ok: false, response });

        next();
    }
}

module.exports = CustomRouter;