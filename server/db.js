const { Pool } = require('pg')
const pool = new Pool({
    user: "postgres",
    password: "stalin",
    host: "localhost",
    post: 5432,
    database: "slot-machine"
})

module.exports = pool