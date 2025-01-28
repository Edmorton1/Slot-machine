const db = require('../../db.js')
const bcrypt = require('bcrypt')
const TokenService = require('./TokenService.js')

class UserService {
    async registration(data) {
        const candidat = await db.query(`SELECT * FROM users WHERE login = '${data.login}'`)
        if (candidat.rows.length != 0) {
            throw new Error('Пользователь с таким логином уже существует')
        }
        const hashPassword = await bcrypt.hash(data.password, 3)
        const user = await db.query(`INSERT INTO users(password, balance, login) VALUES('${hashPassword}', ${data.balance}, '${data.login}') RETURNING *`)
        // ТОКИРОВАНИЕ
        const userModel = user.rows[0]
        const tokens = await TokenService.generateTokens({"id": userModel.id, "login": userModel.login})
        await TokenService.saveToken(userModel.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userModel
        }
    }
    async login(login, password) {
        const candidat = await db.query(`SELECT * FROM users WHERE login = '${login}'`)
        const userModel = candidat.rows[0]

        if (candidat.rows.length == 0) {
            throw new Error('Пользователя с таким логином не существует')
        }
        const passwordCompireDataBase = await bcrypt.compare(password, userModel.password)
        if (!passwordCompireDataBase) {
            throw new Error('Неверный пароль')
        }
        const tokens = await TokenService.generateTokens({"id": userModel, "login": login})
        await TokenService.saveToken(userModel.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userModel
        }
    }
    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return ['Вы вышли из аккаунта']
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('Пользователь не авторизован')
        }
        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenFromDataBase = (await TokenService.findToken(refreshToken)).rows[0]
        if (!userData || !tokenFromDataBase) {
            throw new Error('Пользователь не авторизован')
        }
        const candidat = await db.query(`SELECT * FROM users WHERE login = '${userData.login}'`)
        const userModel = candidat.rows[0]
        const tokens = await TokenService.generateTokens({"id": userModel, "login": userData.login})
        await TokenService.saveToken(userModel.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userModel
        }
    }
    async get() {
        const posts = await db.query('SELECT users.id, users.login, users.balance, tokens.token FROM users FULL OUTER JOIN tokens ON users.id = tokens.user_id')
        return posts.rows
    }
    async changeBalance(data) {
        const {id, balance} = data
        const zapros = await db.query(`UPDATE users SET balance = ${balance} WHERE id = ${id}`)
        return zapros
    }
}

module.exports = new UserService()