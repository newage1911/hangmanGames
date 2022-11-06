import { Key } from "react"
import { act } from "react-dom/test-utils"
import styles from "../styles/Keyboard.module.css"

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]

type KeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]
    disabled?: boolean
    addGuessLetter: (letter: string) => void
}

const Keyboard = ({ activeLetters, inactiveLetters, disabled=false, addGuessLetter }: KeyboardProps) => {
    return (
    <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
        }}>
    {KEYS.map(key => {
        const isActive = activeLetters.includes(key)
        const isInActive = inactiveLetters.includes(key)
        return (
        <button 
        onClick={() => addGuessLetter(key)}
        className={`${styles.btn} ${isActive ? styles.active : ""} ${isInActive ? styles.inactive : ""}`} 
        disabled={isActive || isInActive || disabled}
        key={key}>{key}
        </button>
       ) 
    })}
    </div>
    )
}
export default Keyboard;
