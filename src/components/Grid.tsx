import React from 'react'
import { Guess } from '../react-app-env';
import { GridRow } from './GridRow';

interface Props {
  currentGuess: string;
  guesses: Guess[];
  turn: number;
}

export const Grid: React.FC<Props> = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((guess, index) => (
        <GridRow key={index} />
      ))}
    </div>
  )
}

