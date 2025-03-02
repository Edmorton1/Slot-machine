import { useEffect, useRef, useState } from "react"
import "./App.scss"
import barabanTry from "./BARABAN DEBUG.png"

export const App = () => {
    const [spin, setSpin] = useState(false)
    const [last, setLast] = useState(0)
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
        function count(time: number, speed:number, last: number) {
            const total = time / 1000 / speed * 2016 - (Math.floor(time / 1000 / speed) * 2016) + 168
            console.log(total)
            if (total < 336) {
                return "seven";
            } else if (total >= 336 && total < 672) {
                return "lemon";
            } else if (total >= 672 && total < 1008) {
                return "bar";
            } else if (total >= 1008 && total < 1344) {
                return "grape";
            } else if (total >= 1344 && total < 1680) {
                return "bell";
            } else if (total >= 1680 && total < 2016) {
                return "cherry";
            }  else if (total >= 2016 && total < 2352) {
                return "seven";
            } else if (total >= 2352 && total < 2688) {
                return "seven";
            } else if (total >= 2688) {
                return "bar";
            }
        }
        const firstTime = RandomTime()
        const speed = RandomSpeed()

        if (barabanRef.current != null && spin==true) {
            barabanRef.current.style.animationName = "spin"
            barabanRef.current.style.animationDuration = `${speed}s`
            barabanRef.current.style.animationPlayState = `running`
            setTimeout(() => {
                console.log(count(firstTime, speed, last))
                count(firstTime, speed, last)
                setLast(firstTime / 1000 / speed * 2016 - (Math.floor(firstTime / 1000 / speed) * 2016) + 168 - last)
                barabanRef.current.style.animationPlayState = "paused"
                setSpin(false)
            }, firstTime)
        }
    })

    return (
        <>
            <div id="slots">
                <img ref={barabanRef} src={barabanTry} />
            </div>
            <button onClick={() => {setSpin(true)}}>Крутанём?</button>
        </>
    )
}