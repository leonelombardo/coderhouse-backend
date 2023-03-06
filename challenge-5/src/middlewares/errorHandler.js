const errorHandler = (error, req, res, next) => {
    const status = error.status || 500
    const ok = error.ok || false
    const response = error.response || "Internal server error."

    res.status(status).json({ status, ok, response })
}

module.exports = errorHandler