import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Keypad.scss';

import data from '../../api/data.json';
import { Key } from '../Key';
import { AppContext } from '../../AppContext';

export const Keypad: React.FC = React.memo(
  () => {
    const [rowOne, setRowOne] = useState<{key: string}[]>([]);
    const [rowTwo, setRowTwo] = useState<{key: string}[]>([]);
    const [rowThree, setRowThree] = useState<{key: string}[]>([]);
    const { usedKeys } = useContext(AppContext);

    const loadRowOne = useCallback(
      async () => {
        setRowOne(data.letters['row-1']);
      }, []);
    
    const loadRowTwo = useCallback(
      async () => {
        setRowTwo(data.letters['row-2']);
      }, []);

    const loadRowThree = useCallback(
      async () => {
        setRowThree(data.letters['row-3']);
      }, []);

    useEffect(() => {
      loadRowOne();
      loadRowTwo();
      loadRowThree();
    }, [loadRowOne, loadRowTwo, loadRowThree]);

    return (
      <div className="keypad">
        <div className="keypad__row">
          {rowOne.map(letter => (
            <Key 
              key={letter.key} 
              letter={letter} 
              keyColor={usedKeys[letter.key]}
            />
          ))}
        </div>
        <div className="keypad__row">
          {rowTwo.map(letter => (
            <Key 
              key={letter.key} 
              letter={letter} 
              keyColor={usedKeys[letter.key]}
            />
          ))}
        </div>
        <div className="keypad__row">
          {rowThree.map(letter => (
            <Key 
              key={letter.key}
              letter={letter}
              keyColor={usedKeys[letter.key]}
            />
          ))}
        </div>
      </div>
    );
  }
);
