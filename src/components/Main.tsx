import { App } from "./App"
import { BrowserRouter, Routes, Route } from "react-router"

export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/login"/>
                <Route path="registration" />
                <Route path="logout"/>
            </Routes>
        </BrowserRouter>
    )
}