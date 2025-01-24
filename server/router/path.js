const router = require('./router.js')

const start = (app) => {
    router('/api/users/', 'users', app)
    router('/api/history/', 'history', app)
}

module.exports = start