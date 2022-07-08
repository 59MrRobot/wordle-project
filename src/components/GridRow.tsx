import React from 'react'
import { Guess } from '../react-app-env';
import cn from 'classnames';

interface Props {
  guess: Guess;
}

export const GridRow: React.FC<Props> = ({ guess }) => {
  return guess 
    ? (
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
    )
    : (
      <div className="row">
        <div className="row__item"></div>
        <div className="row__item"></div>
        <div className="row__item"></div>
        <div className="row__item"></div>
        <div className="row__item"></div>
      </div>
    );
}
