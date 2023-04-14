import React from 'react';
import { Guess, State } from '../../react-app-env';
import cn from 'classnames';
import './GridRow.scss';
import { useSelector } from 'react-redux';

interface Props {
  guess?: Guess;
  currentGuess?: string;
}

export const GridRow: React.FC<Props> = React.memo(
  ({ guess, currentGuess }) => {
    const theme = useSelector((state: State) => state.wordle).theme;

    if (guess) {
      return (
        <div className="row grid__row">
          {guess.map((letter, index) => (
            <div
              key={index} 
              className={cn(
                'row__item',
                `row__item--${theme}`,
                letter.color,
                `${letter.color}--${theme}`,
              )}
            >
              {letter.key}
            </div>
          ))}
        </div>
      );
    }
    
    if (currentGuess) {
      let currentGuessArray = currentGuess.split('');

      return (
        <div className="row current">
          {currentGuessArray.map((letter: string, index: number) => (
            <div key={index} className={`row__item filled row__item--${theme}`}>
              {letter}
            </div>
          ))}
          {[...Array(5 - currentGuessArray.length)].map((value, index) => (
            <div key={index} className="row__item"></div>
          ))}
        </div>
      );
    }

    return (
      <div className="row">
        <div className="row__item"></div>
        <div className="row__item"></div>
        <div className="row__item"></div>
        <div className="row__item"></div>
        <div className="row__item"></div>
      </div>
    );
  }
);
