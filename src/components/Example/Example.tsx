import React from 'react';
import './Example.scss';
import cn from 'classnames';

interface Props {
  letters: string[];
}

export const Example: React.FC<Props> = ({ letters }) => {
  return (
    <div className="Example">
      {letters.map((letter, index) => (
        <div
          key={index}
          className={cn(
            'Example__block',
            {'green': letter === 'w'},
            {'yellow': letter === 'i'},
            {'grey': letter === 'u'},
          )}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}
