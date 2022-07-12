import React, { useContext } from 'react';
import cn from 'classnames';
import './Key.scss';
import { AppContext } from '../contexts/AppContext';

interface Props {
  letter: {key: string};
  keyColor: string;
};

export const Key: React.FC<Props> = React.memo(
  ({ letter, keyColor }) => {
    const { handleClick } = useContext(AppContext);

    return (
      <button
        type="button"
        id={letter.key}
        className={cn(
          'key',
          `key--${keyColor}`,
          { 'key--big': letter.key === 'Enter' || letter.key === 'Back' }
        )}
        onClick={() => {
          handleClick(letter.key);
        }}
      >
        {letter.key.toUpperCase()}
      </button>
    );
  },
);

