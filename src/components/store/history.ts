import {makeAutoObservable, toJS} from "mobx"

class history {
    history: Array<any> = [];
    constructor() {
        makeAutoObservable(this)
    };
    async fetchHistory() {
        const res = await fetch('http://localhost:5001/api/history/')
        const data = await res.json()
        this.history = [...data]
        console.log('ИСТОРИЯ ОБНОВЛЕНА',toJS(this.history))
    }
    async postHistory(bet: number, win: number, user_id: number) {
        await this.fetchHistory()
        const data = {
            "id": toJS(this.history.at(-1).id) + 1,
            "bet": bet,
            "win": win,
            "user_id": user_id
        }
        await fetch('http://localhost:5001/api/history/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }
}

export default new history()