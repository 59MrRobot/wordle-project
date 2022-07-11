import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import data from './api/data.json';
import { Grid } from './components/Grid';
import useWordle from './hooks/useWordle';
import { Keypad } from './components/Keypad';
import { Modal } from './components/Modal';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const [solution, setSolution] = useState<string>('');
  const {
    currentGuess,
    guesses,
    turn,
    handleKeyup,
    usedKeys,
    isCorrect,
    errorMessage,
  } = useWordle(solution);
  const [isGameDone, setIsGameDone] = useState(false);

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
    <div className="App">
      <h1 className="App__title">Wordle</h1>

      {solution && (
        <>
          {errorMessage && (
            <ErrorMessage errorMessage={errorMessage} />
          )}

          <Grid 
            currentGuess={currentGuess} 
            guesses={guesses} 
            turn={turn} 
          />

          <Keypad 
            usedKeys={usedKeys}
          />

          {isGameDone && (
            <Modal 
              isCorrect={isCorrect}
              turn={turn}
              solution={solution}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
