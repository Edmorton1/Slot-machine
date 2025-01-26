const HistoryService = require('./HistoryService.js')

class HistoryController {
    async get(req, res) {
        try {
            const allRows = await HistoryService.get()
            return res.send(allRows)
        } catch(e) {
            console.log(e)
        }
    }

    async create(req, res) {
        try {
            const rowCreated = await HistoryService.create(req.body)
            return res.send(rowCreated)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new HistoryController()