const Router = require('express').Router
const router = new Router
const UserController = require('./controllers/Users/UserController.js')
const HistoryController = require('./controllers/History/HistoryController.js')
const {body} = require('express-validator')
const authMiddleware = require('./controllers/Users/auth-middleware.js')

router.get('/users', authMiddleware, UserController.get)

router.post('/history', HistoryController.create)
router.get('/history', HistoryController.get)
router.get('/historyGames/:id', HistoryController.historyGames)

router.post('/registration', 
    body('password').isLength({min: 3, max: 32}),
    UserController.registration,
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.put('/changeBalance', UserController.changeBalance)

module.exports = router