import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import data from './api/data.json';
import { Grid } from './components/Grid';
import { Keypad } from './components/Keypad';
import { Modal } from './components/Modal';
import { ErrorMessage } from './components/ErrorMessage';
import { Guess } from './react-app-env';
import { AppContext } from './contexts/AppContext';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';

enum Colors {
  Grey = 'grey',
  Yellow = 'yellow',
  Green = 'green',
}

function App() {
  const [solution, setSolution] = useState<string>('');
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<Guess[]>([...Array(6)]); 
  const [history, setHistory] = useState<string[]>([]); 
  const [isCorrect, setIsCorrect] = useState(false); 
  const [usedKeys, setUsedKeys] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isGameDone, setIsGameDone] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const createNewGame = () => {
    loadSolution();
    setTurn(0)
    setCurrentGuess('');
    setGuesses([...Array(6)]);
    setHistory([]);
    setIsCorrect(false);
    setUsedKeys({});
    setIsGameDone(false);
  }

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

      if (setCurrentGuess) {
        setCurrentGuess('');
      }
    },
    [currentGuess, setCurrentGuess, solution, turn],
  );

  const handleKeyup = useCallback(
    ({ key }: { key: string }) => {
      if (key === 'Enter') {
        if (currentGuess.length !== 5) {
          setErrorMessage('Word must be 5 letters');
          return;
        }

        if (history.includes(currentGuess)) {
          setErrorMessage('You\'ve already guessed that word');
          setErrorMessage('');
          return;
        }

        const formattedGuess = formatGuess();

        addNewGuess(formattedGuess);
      }

      if (key === 'Backspace' && setCurrentGuess) {
        setCurrentGuess(prevState => prevState.slice(0, -1));
        return;
      }

      if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5 && setCurrentGuess) {
        setCurrentGuess(prevState => prevState + key);
        setErrorMessage('');
        return;
      }
    },
    [addNewGuess, currentGuess, formatGuess, history, setCurrentGuess],
  );

  const handleClick = useCallback(
    (key: string ) => {
      if (key === 'Enter') {
        if (currentGuess.length !== 5) {
          setErrorMessage('Word must be 5 letters');
          return;
        }

        if (history.includes(currentGuess)) {
          setErrorMessage('You\'ve already guessed that word');
          setErrorMessage('');
          return;
        }

        const formattedGuess = formatGuess();

        addNewGuess(formattedGuess);
      }

      if (key === 'Back') {
        setCurrentGuess(prevState => prevState.slice(0, -1));
        return;
      }

      if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(prevState => prevState + key);
        setErrorMessage('');
        return;
      }
    },
    [addNewGuess, currentGuess, formatGuess, history, setCurrentGuess],
  );

  const loadSolution = useCallback(
    async () => {
      const randomIndex = Math.floor(Math.random() * data.solutions.length);

      const randomSolution = data.solutions[randomIndex];

      setSolution(randomSolution.word);
    }, []);

  useEffect(() => {
    loadSolution();
  },[loadSolution]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if (isCorrect) {
      setTimeout(() => setIsGameDone(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setIsGameDone(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <AppContext.Provider value={{
      solution,
      currentGuess,
      guesses,
      turn,
      errorMessage,
      handleClick,
      usedKeys,
      isCorrect,
    }}>
      <div className="App">
        <Header setShowInstructions={setShowInstructions} />

        {showInstructions && (
          <Instructions setShowInstructions={setShowInstructions} />
        )}

        {solution && (
          <>
            {errorMessage && (
              <ErrorMessage />
            )}

            <Grid />

            <Keypad />

            {isGameDone && (
              <Modal onNewGame={createNewGame} />
            )}
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
