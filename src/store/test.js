import {makeAutoObservable, makeObservable} from "mobx"

class Counter {
    todo = []
    constructor() {
        makeAutoObservable(this)
    };

    add(value) {
        this.todo.push(value)
    };
    remove(id) {
        this.todo.pop(id)
    };
}

export default new Counter()