import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import './Keypad.scss';

import data from '../../api/data.json';

interface Props {
  usedKeys: any;
}

export const Keypad: React.FC<Props> = React.memo(
  ({ usedKeys }) => {
    const [letters, setLetters] = useState<{key: string}[]>([]);

    const loadLetters = useCallback(
      async () => {
        setLetters(data.letters);
      }, []);

    useEffect(() => {
      loadLetters();
    }, [loadLetters]);

    return (
      <div className="keypad">
        {letters && letters.map(letter => {
          const color = usedKeys[letter.key];

          return (
            <div 
              key={letter.key} 
              className={cn(
                'keypad__key',
                `keypad__key--${color}`,
              )}
            >
              {letter.key.toUpperCase()}
            </div>
          )
        })}
      </div>
    );
  }
);

