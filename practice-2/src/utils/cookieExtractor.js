const cookieExtractor = req => req?.cookies?.token || null;

module.exports = cookieExtractor;