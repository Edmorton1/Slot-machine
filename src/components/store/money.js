import {makeAutoObservable} from "mobx"
import axios from "axios"
import { API_URL } from "../response/http"

class Counter {
    constructor() {
        makeAutoObservable(this)
    };

    async change(value, userID) {
        this.balance = value
        if (userID) {
            const data = {
                "id": userID,
                "balance": value
            }
            await axios.put(`${API_URL}/changeBalance`, data)
        }
    };
}

export default new Counter()