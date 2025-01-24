require('dotenv').config()
const express = require('express')
const cors =require('cors')
const cookieParser = require('cookie-parser')
const start = require('./router/path')

const db = require('./db.js')
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.post('/api/users/', async (req, res) => {
    const {id, login, password, balance} = req.body;
    const obj = await db.query(`INSERT INTO users(id, login, password, balance) VALUES($1, $2, $3, $4) RETURNING *`, [id, login, password, balance])
    res.json(obj.rows[0]);
});

start(app)

app.listen(PORT, () => {console.log(`Server started on port: http://localhost:${PORT}`)})