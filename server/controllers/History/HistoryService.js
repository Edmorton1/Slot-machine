const db = require('../../db.js')

class HistoryService {
    async get() {
        try {
            const posts = await db.query('SELECT * FROM history')
            return posts.rows
        } catch(e) {
           console.log(e)
        }
    }

    async create(post) {
         try {
            const keys = Object.keys(post)
            const values = Object.values(post)
            const placeholders = values.map((_, i) => `$${i + 1}`)
            const obj = await db.query(`INSERT INTO history(${keys}) VALUES(${placeholders}) RETURNING *`, values)
            console.log('HISTORY ОТПРАВЛЕНО')
            return obj.rows
        } catch(err) {
        console.log(err)
        }
    }
}

module.exports = new HistoryService()