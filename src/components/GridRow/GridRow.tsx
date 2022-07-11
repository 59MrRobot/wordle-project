import React from 'react';
import { Guess } from '../../react-app-env';
import cn from 'classnames';
import './GridRow.scss';

interface Props {
  guess?: Guess;
  currentGuess?: string;
}

export const GridRow: React.FC<Props> = React.memo(
  ({ guess, currentGuess }) => {
    if (guess) {
      return (
        <div className="row">
          {guess.map((letter, index) => (
            <div 
              key={index} 
              className={cn(
                'row__item',
                letter.color,
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
          {currentGuessArray.map((letter, index) => (
            <div key={index} className="row__item filled">
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
