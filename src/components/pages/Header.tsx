import { ReactNode, useContext, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import "../css/Header.scss"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import money from "../store/money"

function Header() {
    const [modalRegistration, setModalRegistration] = useState(false)
    const [modalEnter, setModalEnter] = useState(false)
    const {store} = useContext(Context)

    function render(): any {
        if (!store.user.login) {
            return (
                <>
                    <Link to="/login"><button onClick={() => setModalEnter(true)}>Войти</button></Link>
                    <Link to="/registration"><button onClick={() => setModalRegistration(true)}>Зарегестрироваться</button></Link>
                </>
            )
        };
        return (
            <>
                <div>Добро пожаловать, {store.user.login}</div>
                <button onClick={() => {store.logout(); money.change(100)}}>Выйти</button>
            </>
        )
    }

    return (
        <header>
            <Link to="/"><img src={logo} /></Link>
            {render()}
        </header>
    )
}

export default observer(Header)