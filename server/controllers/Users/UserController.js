const UserService = require('./UserService.js')
const TokenService = require('./TokenService.js')
const {validationResult} = require('express-validator')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({
                    message: "Ошибка валидации",
                    errors: errors.array()
                })
            }
            const userData = await UserService.registration(req.body)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch(e) {
            next(e)
        }
    }
    async login(req, res) {
        try {
            const {login, password} = req.body
            const userData = await UserService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch(e) {
            console.log(e)
        }
    }
    async logout(req, res) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch(e) {
            console.log(e)
        }
    }
    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch(e) {
            console.log(e)
        }
    }
    async get(req, res) {
        try {
            const allRows = await UserService.get()
            return res.send(allRows)
        } catch(e) {
            console.log(e)
        }
    }
    async changeBalance(req, res) {
        try {
            console.log('БАЛАНС ИЗМЕНЁН')
            const zapros = await UserService.changeBalance(req.body)
            return res.json(zapros.rows)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()