import {makeAutoObservable} from "mobx"

class Counter {
    balance = 100
    constructor() {
        makeAutoObservable(this)
    };

    change(value) {
        this.balance = value
    };
}

export default new Counter()