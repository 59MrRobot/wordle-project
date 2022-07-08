import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle';
import { Grid } from './Grid';
import { Keypad } from './Keypad';

interface Props {
  solution: string;
}

export const Wordle: React.FC<Props> = ({ solution }) => {
  const { turn, currentGuess, guesses, handleKeyup, isCorrect, usedKeys } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      console.log('You win!');
      window.removeEventListener('keyup', handleKeyup);
    }

    if (turn > 5) {
      console.log('Unlucky!');
      window.removeEventListener('keyup', handleKeyup);
    }

    // prevents loads of keyup eventListeners everytime useEffect runs
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect, turn])

  return (
    <>
      {solution}
      {currentGuess}
      <Grid 
        currentGuess={currentGuess} 
        guesses={guesses} 
        turn={turn} 
      />
      <Keypad usedKeys={usedKeys} />
    </>
  )
}
