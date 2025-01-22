import "./modal.scss"
import money from "../store/money"

interface ModalInterface {
    active: boolean,
    setActive: Function
}

export default function Modal({setActive}: ModalInterface) {
    return (
        <div className="modal">
            <div className="content">
                Похоже, что у вас закончились деньги, вы можете <u onClick={() => setActive(false)}>
                    избавиться от лудомании</u> и больше не играть в казино, или 
                    <a href="https://www.youtube.com/watch?v=3ObzGOsTV1c&ab_channel=Edmorton" target="blank" onClick={() => {money.change(100); setActive(false)}}>открыть видео</a> и получить 100$
            </div>
        </div>
    )
}