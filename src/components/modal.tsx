import "./modal.scss"

interface ModalInterface {
    active: boolean,
    setActive: Function
}

export default function Modal({active, setActive}: ModalInterface) {
    return (
        <div className="modal">
            <div className="content">
                Похоже, что у вас закончились деньги, вы можете <a href="#" onClick={() => {console.log('asdasd')}}>избавиться от лудомании</a> и больше никогда в жизни не играть в казино, или <a href="https://www.youtube.com/watch?v=3ObzGOsTV1c&ab_channel=Edmorton" target="blank">открыть видео</a> и получить 100$
            </div>
        </div>
    )
}