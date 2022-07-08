import { useState } from "react"

// enum Colors {
//   Grey = 'grey',
//   Yellow = 'yellow',
//   Green = 'green',
// }

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  // const [guesses, setGuesses] = useState([]); 
  const [history, setHistory] = useState<string[]>([]); 
  // const [isCorrect, setIsCorrect] = useState(false); 

  // format a guess into an array of letter objects
  // e.g. [{letter: 'a', color: 'yellow'}]
  const formatGuess = () => {
    console.log(`formatting current guess ${currentGuess}`)
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  // const addNewGuess = () => {

  // }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }: { key: string }) => {
    if (key === 'Enter') {
      if (currentGuess.length !== 5) {
        console.log('Word must be 5 letters');
        return;
        
      }

      if (history.includes(currentGuess)) {
        console.log('You\'ve already guessed that word');
        return;
      }

      if (turn > 5) {
        console.log('Used up all guesses');
        return;
      }

      formatGuess();
    }

    if (key === 'Backspace') {
      setCurrentGuess(prevState => prevState.slice(0, -1));

      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prevState => prevState + key);
      }
    }
  }
  // { turn, currentGuess, guesses, isCorrect, handleKeyup}
  return { turn, currentGuess, handleKeyup };
}

export default useWordle;