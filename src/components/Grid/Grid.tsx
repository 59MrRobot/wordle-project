import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext';
import { GridRow } from '../GridRow/GridRow';

export const Grid: React.FC = React.memo(
  () => {
    const { currentGuess, guesses, turn } = useContext(AppContext);

    return (
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
    );
  }
);

