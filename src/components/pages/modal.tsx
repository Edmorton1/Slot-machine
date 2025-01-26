import "../css/modal.scss"

interface ModalInterface {
    children: any
}

export default function Modal({children}: ModalInterface) {
    return (
        <div className="modal">
            <div className="content">
                { children }
            </div>
        </div>
    )
}