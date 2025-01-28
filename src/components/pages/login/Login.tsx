import { useContext, useState } from "react";
import "../../css/Login.scss"
import { Context } from "../../..";

export default function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)

    // const HandleSubmit = (e: React.FormEvent) {
    //     e.preventDefault()
    // }

    return (
        <>
            <main>
                <form>
                    <span>Войти</span>
                    <label>Логин</label>
                    <input type="text" onChange={e => setLogin(e.target.value)} />
                    <label>Пароль</label>
                    <input type="text" onChange={e => setPassword(e.target.value)} />
                    <button onClick={(e) => {store.login(login, password); e.preventDefault()}} type="submit">Войти</button>
                </form>
            </main>
        </>
    );
}
