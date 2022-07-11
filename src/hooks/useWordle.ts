import { useCallback, useState } from "react"
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
  const [usedKeys, setUsedKeys] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState('');

  // format a guess into an array of letter objects
  // e.g. [{letter: 'a', color: 'yellow'}]
  const formatGuess = useCallback(
    () => {
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
      });

      return formattedGuess;
    },
    [currentGuess, solution],
  );

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = useCallback(
      (formattedGuess: Guess) => {
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

      setUsedKeys((prevUsedKeys: any) => {
        const newKeys = {...prevUsedKeys};

        formattedGuess.forEach(letter => {
          const currentColor = newKeys[letter.key];

          if (letter.color === Colors.Green) {
            newKeys[letter.key] = Colors.Green;
            return;
          }

          if (letter.color === Colors.Yellow && currentColor !== Colors.Green) {
            newKeys[letter.key] = Colors.Yellow;
            return;
          }

          if (letter.color === Colors.Grey && currentColor !== Colors.Yellow && currentColor !== Colors.Green) {
            newKeys[letter.key] = Colors.Grey;
            return;
          }
        });

        return newKeys;
      })

      setCurrentGuess('');
    },
    [currentGuess, solution, turn],
  );

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'Enter') {
        if (currentGuess.length !== 5) {
          setErrorMessage('Word must be 5 letters');
          return;
        }

        if (history.includes(currentGuess)) {
          setErrorMessage('You\'ve already guessed that word');
          return;
        }

        const formattedGuess = formatGuess();

        addNewGuess(formattedGuess);
      }

      if (key === 'Backspace') {
        setCurrentGuess(prevState => prevState.slice(0, -1));
        setErrorMessage('');

        return;
      }

      if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(prevState => prevState + key);
        setErrorMessage('');
        return;
      }
    },
    [addNewGuess, currentGuess, formatGuess, history],
  );

  return { 
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyup,
    usedKeys,
    errorMessage,
  };
}

export default useWordle;