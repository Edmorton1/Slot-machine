import { useEffect, useRef, useState } from "react"
import "./App.scss"
import { observer } from "mobx-react-lite"
import seven from "./slots/SEVEN.png"
import lemon from "./slots/LEMON.png"
import bar from "./slots/BAR.png"
import grape from "./slots/GRAPE.png"
import bell from "./slots/BELL.png"
import cherry from "./slots/CHERRY.png"
import logo from "./logo.png"
import spinSound from "./sounds/SPINING.mp3"
import buttonSound from "./sounds/BUTTON.mp3"
import winSound from "./sounds/INFO.mp3"
import bigWinSound from "./sounds/BIG WIN.mp3"
import JackpotSound from "./sounds/JACKPOT.mp3"
import Modal from "./modal"
import money from "../store/money"

export const App = observer(() => {
    const [spin, setSpin] = useState(false)
    const [win, setWin] = useState(0)
    const [bet, setBet] = useState(10)
    const [betState, setBetState] = useState(true)
    const [combination, setCombination] = useState<string[]>(["", "", ""])
    const [modalActive, setModalActive] = useState(false)

    const slotRefs = [useRef(null), useRef(null), useRef(null)]

    const images = [seven, lemon, bar, grape, bell, cherry]
    const symbols = ["seven", "lemon", "bar", "grape", "bell", "cherry"]
    const winFactor: [string, number][] = [["seven", 259], ["lemon", 5], ["bar", 10], ["bell", 9], ["grape", 7], ["cherry", 3]]

    const playSound = (soundName: string) => {
        const sound = new Audio(soundName);
        sound.play()
    }

    function winCounting(bet: string[]): number {
        let total = 0
        winFactor.map(el => {
            const count = bet.filter(value => value == el[0]).length
            if (count == 3 && el[0] == "seven") {
                total += 3 * el[1]
                playSound(JackpotSound)
            } else if (count == 3) {
                total += 3 * el[1]
                playSound(bigWinSound)
            } else if (count == 2 && el[0] == "seven") {
                total += 15
                playSound(bigWinSound)
            } else if (count == 1 && el[0] == "seven") {
                total += 1
            } return 0
        })
        setCombination(["", "", ""])
        return total
    }

    function startSpin(ref: React.RefObject<any>, delay: number, index: number) {
        let intervalId: NodeJS.Timeout

        const spinSlot = () => {
            const random = Math.floor(Math.random() * images.length)
            ref.current.src = images[random]
            setCombination((prev) => {
                const newCombination = [...prev];
                newCombination[index] = symbols[random]
                return newCombination
            })
        }

        intervalId = setInterval(spinSlot, 30)

        setTimeout(() => {
            clearInterval(intervalId);
            ref.current.style.animationName = ""
        }, delay)
    }

    useEffect(() => {
        if (spin) {
            const delays = [900, 1800, 2700]

            slotRefs.forEach((ref, index) => {
                if (ref.current) {
                    ref.current.style.animationName = "spin"
                    startSpin(ref, delays[index], index)
                }
            });
            setTimeout(() => {
                setSpin(false)
            }, Math.max(...delays) + 500)
        }
        money.change(money.balance + winCounting(combination) * bet)
        setWin(winCounting(combination) * bet)
        {money.balance == 0 && !spin && setModalActive(true)}
    }, [spin])

    const handlerBet = (value: number) => {
           if ((bet + value > money.balance)) {
            setBet(money.balance)
           } else if (money.balance == 0) {
            setBet(0)
           } else if ((bet + value) < 1) {
            setBet(1)
           } else if ((bet + value) > 999) {
            setBet(999)
           } else {
            setBet(bet + value)
           }
        }

    return (
        <>
            <header>
                <img src={logo} />
            </header>
            {modalActive ? <Modal active={modalActive} setActive={setModalActive}/> : ''}
            <div id="automat">
                <div id="slots">
                    {slotRefs.map((ref, index) => (
                        <img src={seven} ref={ref} key={index} />
                    ))}
                </div>
                <div id="interface">
                    <div className="info">Win: {win == 0 ? "" : `${win}$`}</div>
                    <div className="info">Balance: {money.balance}$</div>
                    <button className="go-button" onClick={() => {if (money.balance > 0) {setSpin(true); money.change(money.balance - bet); playSound(spinSound); playSound(buttonSound)}
                                                                  else {setModalActive(true); playSound(buttonSound)}}} disabled={spin}></button>
                    <div className="bet">
                        <span>Bet: {bet}$
                            <button className="change" onClick={() => setBetState(true)}>+</button>
                            <button className="change" onClick={() => setBetState(false)}>-</button>
                        </span>
                        <button onClick={() => {money.balance != 0 && handlerBet(betState ? 1 : -1); playSound(winSound)}} className="bet-state" disabled={spin}>{betState ? '+1$' : '-1$'}</button>
                        <button onClick={() => {money.balance != 0 && handlerBet(betState ? 10 : -10); playSound(winSound)}} className="bet-state" disabled={spin}>{betState ? '+10$' : '-10$'}</button>
                        <button onClick={() => {money.balance != 0 && handlerBet(betState ? 100 : -100); playSound(winSound)}} className="bet-state" disabled={spin}>{betState ? '+100$' : '-100$'}</button>
                    </div>              
                    <button className="info">History</button>
                </div>
            </div>
        </>
    )
}) 