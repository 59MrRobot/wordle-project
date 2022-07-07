import { useState } from "react"

enum Colors {
  Grey = 'grey',
  Yellow = 'yellow',
  Green = 'green',
}

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]); 
  const [history, setHistory] = useState([]); 
  const [isCorrect, setIsCorrect] = useState(false); 

  // format a guess into an array of letter objects
  // e.g. [{letter: 'a', color: 'yellow'}]
  const formatGuess = () => {

  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = () => {

  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyUp = () => {

  }

  return { turn, currentGuess, guesses, isCorrect, handleKeyUp}
}

export default useWordle;