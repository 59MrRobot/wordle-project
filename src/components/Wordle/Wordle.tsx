import React, { useEffect, useState } from 'react'
import useWordle from '../../hooks/useWordle';
import { Grid } from '../Grid/Grid';
import { Keypad } from '../Keypad/Keypad';
import { Modal } from '../Modal/Modal';

interface Props {
  solution: string;
}

export const Wordle: React.FC<Props> = ({ solution }) => {
  const { turn, currentGuess, guesses, handleKeyup, isCorrect, usedKeys } = useWordle(solution);
  const [isGameDone, setIsGameDone] = useState(false);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => setIsGameDone(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setIsGameDone(true), 2000);
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn])

  return (
    <>
      {solution}
      <Grid 
        currentGuess={currentGuess} 
        guesses={guesses} 
        turn={turn} 
      />
      <Keypad usedKeys={usedKeys} />
      {isGameDone && (
        <Modal 
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
        />
      )}
    </>
  )
}
