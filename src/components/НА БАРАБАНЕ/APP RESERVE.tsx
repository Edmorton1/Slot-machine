import { useEffect, useRef, useState } from "react"
import "./App.scss"
import barabanTry from "./BARABAN try.png"

export const App = () => {
    const [spin, setSpin] = useState(false)
    const barabanRef = useRef(null)
    const barabanRef2 = useRef(null)
    const barabanRef3 = useRef(null)

    const symbols = ["cherry", "bell", "7", "BAR", "lemon", "pinaple"]

    function RandomTime() {
        return Math.random() * 500 + 1000
    }
    function RandomSpeed() {
        return Math.random() * 0.1 + 0.2
    }

    useEffect(() => {
        const firstTime = RandomTime()
        const secodTime = RandomTime()
        const thirdTime = RandomTime()
        if (barabanRef.current != null && barabanRef2.current != null && barabanRef3.current != null && spin==true) {
            barabanRef.current.style.animationDuration = `${RandomSpeed()}s`
            barabanRef.current.style.animationPlayState = `running`
            setTimeout(() => {
                barabanRef.current.style.animationPlayState = "paused"
            }, firstTime)
            setTimeout(() => {
                barabanRef2.current.style.animationDuration = `${RandomSpeed()}s`
                barabanRef2.current.style.animationPlayState = "running"
            })
            setTimeout(() => {
                barabanRef2.current.style.animationPlayState ="paused"
            }, firstTime + secodTime)
            setTimeout(() => {
                barabanRef3.current.style.animationDuration = `${RandomSpeed()}s`
                barabanRef3.current.style.animationPlayState = "running"
            })
            setTimeout(() => {
                barabanRef3.current.style.animationPlayState ="paused"
                setSpin(false)
            }, firstTime + secodTime + thirdTime)
        }
    })

    return (
        <>
            <div id="slots">
                <img ref={barabanRef} src={barabanTry} />
                <img ref={barabanRef2} src={barabanTry} />
                <img ref={barabanRef3} src={barabanTry} />
            </div>
            <button onClick={() => {setSpin(true)}}>Крутанём?</button>
        </>
    )
}