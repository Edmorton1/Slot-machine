const db = require('../db.js')

function router(url, table, app) {
    try {
        app.get(url, async (req, res) => {
            const obj = await db.query(`SELECT * FROM ${table} ORDER BY ID`)
            res.json(obj.rows)
        })
        app.post(url, async (req, res) => {
            const keys = Object.keys(req.body)
            const values = Object.values(req.body)
            const obj = await db.query(`INSERT INTO ${table}(${keys}) VALUES(${values})`)
            await db.query(`DELETE FROM history WHERE user_id = ${values[3]} AND id NOT IN (SELECT id FROM history Where user_id = ${values[3]} ORDER BY id DESC LIMIT 50)`)
            res.json(obj.rows)
        })
    } catch(err) {
        console.log(err)
    }
    
}

module.exports = router