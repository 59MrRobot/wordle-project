import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle';

interface Props {
  solution: string;
}

export const Wordle: React.FC<Props> = ({ solution }) => {
  const { currentGuess, handleKeyup } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    // prevents loads of keyup eventListeners everytime useEffect runs
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup])

  return (
    <>
      <div>solution - {solution}</div>
      <div>current guess - {currentGuess}</div>
    </>
  )
}
