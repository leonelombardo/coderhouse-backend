class CustomError extends Error{
    constructor({ message, status, ok, response }){
        super(message),
        this.status = status,
        this.ok = ok,
        this.response = response
    }
}

module.exports = CustomError