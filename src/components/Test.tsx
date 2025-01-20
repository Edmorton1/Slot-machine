import { observer } from "mobx-react-lite"
import test from "../store/test"

const Test = observer(() => {
    console.log(test.todo)
        return (
            <div>
                <div>
                    <button onClick={() => {test.add('ogofdgogofg'); console.log(test.todo)}}>+</button>
                    <button onClick={() => {test.remove(0); console.log(test.todo)}}>-</button>
                </div>
            </div>
        )
    }
)

export default Test