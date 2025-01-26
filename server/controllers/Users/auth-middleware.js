const TokenService = require("./TokenService");

module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(new Error('Ошибка авторизации'))
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(new Error('Ошибка авторизации'))
        }
        const userData = await TokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(new Error('Ошибка авторизации'))
        }
        req.user = userData
        next();
    } catch(e) {
        return next(new Error('Ошибка авторизации'))
    } 
}