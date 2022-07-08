import React, { useEffect, useState } from 'react'
import { getLetters } from '../api/letters';
import { Letter } from '../react-app-env';
import cn from 'classnames';

interface Props {
  usedKeys: any;
}

export const Keypad: React.FC<Props> = ({ usedKeys }) => {
  const [letters, setLetters] = useState<Letter[]>([]);

  const loadLetters = async () => {
    const loadedLetters = await getLetters();

    setLetters(loadedLetters);
  }

  useEffect(() => {
    loadLetters();
  }, []);

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
  )
}

