import { useState } from "react"
import { Link } from "react-router"
import logo from "../assets/logo.png"

export default function Header() {
    const [modalRegistration, setModalRegistration] = useState(false)
    const [modalEnter, setModalEnter] = useState(false)
    return (
            <header>
            <img src={logo} />
            <Link to="login"><button onClick={() => setModalEnter(true)}>Войти</button></Link>
            <Link to="registration"><button onClick={() => setModalRegistration(true)}>Зарегестрироваться</button></Link>
        </header>
    )
}