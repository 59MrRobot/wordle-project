import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle';
import { Grid } from './Grid';

interface Props {
  solution: string;
}

export const Wordle: React.FC<Props> = ({ solution }) => {
  const { turn, currentGuess, guesses, isCorrect, handleKeyup } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    // prevents loads of keyup eventListeners everytime useEffect runs
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup])

  useEffect(() => {
    console.log(guesses, turn, isCorrect)
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>solution - {solution}</div>
      <div>current guess - {currentGuess}</div>
      <Grid 
        currentGuess={currentGuess} 
        guesses={guesses} 
        turn={turn} 
      />
    </>
  )
}
