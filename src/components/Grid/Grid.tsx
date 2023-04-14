import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Guess, State } from '../../react-app-env';
import { GridRow } from '../GridRow/GridRow';
import './Grid.scss';

export const Grid: React.FC = React.memo(
  () => {
    const wordle = useSelector((state: State) => state.wordle);
    const { guesses, currentGuess, turn, theme } = wordle;

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

