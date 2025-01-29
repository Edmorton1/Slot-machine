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
    async historyGames(id) {
        const rows = await db.query(
            `SELECT
                COUNT(CASE WHEN (win - bet) > 0 THEN 1 ELSE NULL END) as win,
                COUNT(CASE WHEN (win - bet) < 0 THEN 1 ELSE NULL END) as lose,
                SUM(win) - SUM(bet) as money,
                MAX(win - bet),
                MIN(win - bet)
            FROM history

            WHERE user_id = ${id}`
        )
        return rows.rows
    }
}

module.exports = new HistoryService()