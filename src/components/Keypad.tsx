import React, { useEffect, useState } from 'react'
import { getLetters } from '../api/letters';
import { Letter } from '../react-app-env';

export const Keypad: React.FC = () => {
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
        return (
          <div key={letter.key} className="keypad__key">
            {letter.key.toUpperCase()}
          </div>
        )
      })}
    </div>
  )
}

