import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Guess } from '../../react-app-env';
import { GridRow } from '../GridRow/GridRow';

export const Grid: React.FC = React.memo(
  () => {
    const wordle = useSelector((state: any) => state);
    const { guesses, currentGuess, turn } = wordle.wordle;

    return (
      <div className="grid">
        {guesses.map((guess: Guess, index: number) => {
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
    );
  }
);

