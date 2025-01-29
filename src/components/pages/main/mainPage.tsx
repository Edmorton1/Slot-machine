import { useContext, useEffect, useRef, useState } from "react"
import "../../css/App.scss"
import { observer } from "mobx-react-lite"
import seven from "../../assets/slots/SEVEN.png"
import lemon from "../../assets/slots/LEMON.png"
import bar from "../../assets/slots/BAR.png"
import grape from "../../assets/slots/GRAPE.png"
import bell from "../../assets/slots/BELL.png"
import cherry from "../../assets/slots/CHERRY.png"
import spinSound from "../../assets/sounds/SPINING.mp3"
import buttonSound from "../../assets/sounds/BUTTON.mp3"
import winSound from "../../assets/sounds/INFO.mp3"
import bigWinSound from "../../assets/sounds/BIG WIN.mp3"
import JackpotSound from "../../assets/sounds/JACKPOT.mp3"
import Modal from "../modal"
import money from "../../store/money"
import history from "../../store/history"
import { Context } from "../../.."
import axios from "axios"
import "../../css/AppMedia.scss"

export const MainPage = observer(() => {
    const {store} = useContext(Context)
    const userData = store.user
    const [spin, setSpin] = useState(false)
    const [win, setWin] = useState(0)
    const [bet, setBet] = useState(10)
    const [betState, setBetState] = useState(true)
    const [combination, setCombination] = useState<string[]>(["", "", ""])
    const [modalBalance, setModalBalance] = useState(false)
    const [balanceLoad, setBalanceLoad] = useState(true)
    const [historyModalState, sethistoryModalState] = useState(false)
    const [historyStat, setHistoryStat] = useState<{ win: string; lose: string; money: string; max: number; min: number } | null>(null)

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
        if (store.user.login) {
            getHistory()
        }
        if (balanceLoad) {
            {userData.balance ? money.balance = userData.balance : money.balance = 100}
            setBalanceLoad(false)
        }
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
        money.change(money.balance + winCounting(combination) * bet, userData.id)
        setWin(winCounting(combination) * bet)
        {money.balance == 0 && !spin && setModalBalance(true)}
        if (!combination.includes('') && store.user.login) {
            history.postHistory(bet, winCounting(combination) * bet, userData.id)
        }
    }, [spin])

    const handlerBet = (value: number) => {
           if ((bet + value > money.balance)) {
            setBet(money.balance)
           } else if (money.balance == 0) {
            setBet(0)
           } else if ((bet + value) < 1) {
            setBet(1)
           } else {
            setBet(bet + value)
           }
        }
    async function getHistory() {
        await axios.get(`http://localhost:5001/api/historyGames/${userData.id}`)
            .then(response => (response.data))
            .then((data: any) => setHistoryStat(data[0]));
    }

    return (
        <>
            {modalBalance ?
            <Modal>
            Похоже, что у вас закончились деньги, вы можете <u onClick={() => setModalBalance(false)}>
                    избавиться от лудомании</u> и больше не играть в казино, или 
                    <a href="https://www.youtube.com/watch?v=3ObzGOsTV1c&ab_channel=Edmorton" target="blank" onClick={() => {money.change(100, userData.id); setModalBalance(false)}}>открыть видео</a> и получить 100$
            </Modal> : ''}
            {historyModalState ? 
                    <Modal type="history">
                        <span className="title"><p>История игр</p> <span onClick={() => sethistoryModalState(false)}>X</span></span>
                        <p>Выйгрышей: {historyStat.win} Проигрышей: {historyStat.lose}</p>
                        <p>Денег заработано: {historyStat.money}</p>
                        <p>Самый большой выйгрыш: {historyStat.max}</p>
                        <p>Самый крупный проигрыш: {historyStat.min}</p>
                    </Modal>
                    : ''}
            <div id="automat">
                <div id="slots">
                    {slotRefs.map((ref, index) => (
                        <img src={seven} ref={ref} key={index} />
                    ))}
                </div>
                <div id="interface">
                    <div className="info">Win: {win == 0 ? "" : `${win - bet}$`}</div>
                    <div className="info">Balance: {money.balance}$</div>
                    <button className="go-button" onClick={() => {if (money.balance > 0 && bet <= money.balance) {setSpin(true); money.change(money.balance - bet, userData.id); playSound(spinSound)}
                                                                  else if (bet <= money.balance) {setModalBalance(true)}; playSound(buttonSound)}} disabled={spin}></button>
                    <div className="bet">
                        <span>Bet: {bet}$
                            <button className="change" onClick={() => setBetState(true)}>+</button>
                            <button className="change" onClick={() => setBetState(false)}>-</button>
                        </span>
                        <button onClick={() => {money.balance != 0 && handlerBet(betState ? 1 : -1); playSound(winSound)}} className="bet-state" disabled={spin}>{betState ? '+1$' : '-1$'}</button>
                        <button onClick={() => {money.balance != 0 && handlerBet(betState ? 10 : -10); playSound(winSound)}} className="bet-state" disabled={spin}>{betState ? '+10$' : '-10$'}</button>
                        <button onClick={() => {money.balance != 0 && handlerBet(betState ? 100 : -100); playSound(winSound)}} className="bet-state" disabled={spin}>{betState ? '+100$' : '-100$'}</button>
                    </div>              
                    <button className="info" onClick={() => sethistoryModalState(true)} disabled={spin}>History</button>
                </div>
            </div>
        </>
    )
}) 