import App from "./App"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainPage } from "./main/MainPage"
import Login from "./login/Login"
import Registration from "./registration/Registration"
import { useContext, useEffect, useState } from "react"
import { Context } from "../.."
import { observer } from "mobx-react-lite"

function Main() {
    const {store} = useContext(Context)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        } else {
            setLoad(true)
        }
    }, [])

    if (load || store.isLoading) {
        return (
            <BrowserRouter>
            <App />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />}/>
                </Routes>
            </BrowserRouter>
        ) 
    }
}

export default observer(Main)