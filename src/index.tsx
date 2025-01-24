import {createRoot} from "react-dom/client"
import Main from "./components/Main"

const root = document.getElementById("root")

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

container.render(<Main />)