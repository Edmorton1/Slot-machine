const jwt = require('jsonwebtoken');
const db = require('../../db.js')
class TokenService {
    async generateTokens(payLoad) {
        const accessToken = jwt.sign(payLoad, process.env.JWT_ACCESS_SECRET, {expiresIn: '10d'})
        const refreshToken = jwt.sign(payLoad, process.env.JWT_REFRESH_SECRET, {expiresIn: '10d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async removeToken(refreshToken) {
        const token = await db.query(`DELETE FROM tokens WHERE token = '${refreshToken}'`)
        return token
    }
    async findToken(refreshToken) {
        const token = await db.query(`SELECT * FROM tokens WHERE token = '${refreshToken}'`)
        return token
    }
    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData.id
        } catch(e) {
            console.log(new Error('ТОКЕН ПРОСРОЧИЛСЯ ИЛИ НЕ ВАЛИДЕН'))
        }
    }
    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData.id
        } catch(e) {
            console.log(new Error('ТОКЕН ПРОСРОЧИЛСЯ ИЛИ НЕ ВАЛИДЕН'))
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await db.query(`SELECT * FROM tokens WHERE user_id = ${userId}`)
        
        if (tokenData.rows.length != 0) {
            const updateToken = await db.query(`UPDATE tokens SET token = '${refreshToken}' WHERE user_id = ${userId}`);
            return updateToken;
        }
        const token = await db.query(`INSERT INTO tokens(user_id, token) VALUES(${userId}, '${refreshToken}')`)
        return token;
    }
}

module.exports = new TokenService()