import React, { useCallback, useEffect, useState } from 'react';
import words from './wordList.json'
import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import Keyboard from './components/Keyboard';

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {

  const [wordGuess, setWordGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter(letter => !wordGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessLetter = useCallback((letter: string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner) return 
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isLoser, isWinner])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
        const key = e.key
        if(!key.match(/^[a-z]$/)) return
        e.preventDefault()
        addGuessLetter(key)
    }
    document.addEventListener("keypress", handler)
    return () => {
    document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
        const key = e.key
        if(key !== "Enter") return
        e.preventDefault() 
        setGuessedLetters([])
        setWordGuess(getWord())
    }
    document.addEventListener("keypress", handler)
    return () => {
    document.removeEventListener("keypress", handler)
    }
  }, [])

  return (
  <div style={{
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    margin: "0 auto",
    alignItems: "center"
  }}>

   <div style={{ fontSize: "2rem", textAlign: "center" }}>
    {isWinner && "Winner! - refresh to try agian"}
    {isLoser && "Nice Try - refresh to try agian"}
    </div>

    <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
    <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordGuess={wordGuess}/>

    <div style={{ alignSelf: "stretch"}}>
    <Keyboard 
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter => wordGuess.includes(letter))}
        inactiveLetters={incorrectLetters}
        addGuessLetter={addGuessLetter} />
    </div>

    </div>
)}

export default App;
