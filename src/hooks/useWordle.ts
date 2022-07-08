import { useState } from "react"
import { Guess } from "../react-app-env";

enum Colors {
  Grey = 'grey',
  Yellow = 'yellow',
  Green = 'green',
}

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<Guess[]>([...Array(6)]); 
  const [history, setHistory] = useState<string[]>([]); 
  const [isCorrect, setIsCorrect] = useState(false); 

  // format a guess into an array of letter objects
  // e.g. [{letter: 'a', color: 'yellow'}]
  const formatGuess = () => {
    const solutionArray = solution.split('');
    const formattedGuess = currentGuess.split('').map((letter) => (
      {
        key: letter,
        color: Colors.Grey,
      }
    ));
    
    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
        formattedGuess[index].color = Colors.Green;
        solutionArray[index] = '_';
      }
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== Colors.Green) {
        formattedGuess[index].color = Colors.Yellow;
        solutionArray[solutionArray.indexOf(letter.key)] = '_';
      }
    })

    return formattedGuess;
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess: Guess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];

      newGuesses[turn] = formattedGuess;

      return newGuesses;
    });

    setHistory(prevHistory => ([...prevHistory, currentGuess]));

    setTurn((prevTurn) => prevTurn + 1);

    setCurrentGuess('');
  }

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

      const formattedGuess = formatGuess();

      addNewGuess(formattedGuess);
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

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
}

export default useWordle;