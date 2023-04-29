class CustomError{
    static createError({ name, cause, message, code=1 }){
        const error = new Error(message || "Internal server error.");
        
        error.name = name || "Error.";
        error.cause = cause || "Unknown.";
        error.code = code || "Unknown.";

        throw error;
    }
}

module.exports = CustomError;