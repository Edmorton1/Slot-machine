import { useContext, useState } from "react";
import "../../css/Login.scss"
import { Context } from "../../..";
import money from "../../store/money";

export default function Registration() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)

    return (
        <>
            <main>
                <form>
                    <span>Регистрация</span>
                    <label>Логин</label>
                    <input type="text" onChange={e => setLogin(e.target.value)} />
                    <label>Пароль</label>
                    <input type="text" onChange={e => setPassword(e.target.value)} />
                    <button onClick={(e) => {store.registration(login, password, money.balance); e.preventDefault()}}>Создать</button>
                </form>
            </main>
        </>
    );
}
