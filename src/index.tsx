import {createRoot} from "react-dom/client"
import Test from "./components/Test"

const root = document.getElementById("root")

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

container.render(<Test />)