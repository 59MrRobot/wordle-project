import React from 'react';
import cn from 'classnames';
import './Key.scss';

interface Props {
  letter: {key: string};
  keyColor: string;
};

export const Key: React.FC<Props> = React.memo(
  ({ letter, keyColor }) => (
    <button
      type="button"
      id={letter.key}
      className={cn(
        'key',
        `key--${keyColor}`,
        { 'key--big': letter.key === 'Enter' || letter.key === 'Back' }
      )}
    >
      {letter.key.toUpperCase()}
    </button>
  ),
);
