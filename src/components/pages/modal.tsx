import "../css/modal.scss"

interface ModalInterface {
    children: any,
    type?: string
}

export default function Modal({children, type}: ModalInterface) {
    return (
        <div className="modal">
            <div className="content" id={type}>
                { children }
            </div>
        </div>
    )
}