import React from 'react'
import { Guess } from '../../react-app-env';
import { GridRow } from '../GridRow/GridRow';

interface Props {
  currentGuess: string;
  guesses: Guess[];
  turn: number;
}

export const Grid: React.FC<Props> = React.memo(
  ({ currentGuess, guesses, turn }) => (
    <div className="grid">
      {guesses.map((guess, index) => {
        return index !== turn 
          ? (
            <GridRow 
              key={index} 
              guess={guess}
            />
          )
          : (
            <GridRow 
              key={index}
              currentGuess={currentGuess}
            />
          );
      })}
    </div>
  )
);
