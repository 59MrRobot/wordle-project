import React, { useCallback, useEffect, useState } from 'react';
import './Keypad.scss';
import '../Key/Key.scss';
import data from '../../api/data.json';
import { Key } from '../Key';
import { useSelector } from 'react-redux';
import { State } from '../../react-app-env';

export const Keypad: React.FC = React.memo(
  () => {
    const [rowOne, setRowOne] = useState<{key: string}[]>([]);
    const [rowTwo, setRowTwo] = useState<{key: string}[]>([]);
    const [rowThree, setRowThree] = useState<{key: string}[]>([]);
    const usedKeys = useSelector((state: State) => state.wordle).usedKeys;
    const theme = useSelector((state: State) => state.wordle).theme;

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
          <button className={`key key--half key--half-${theme}`}></button>
          {rowTwo.map(letter => (
            <Key
              key={letter.key} 
              letter={letter} 
              keyColor={usedKeys[letter.key]}
            />
          ))}
          <button className={`key key--half key--half-${theme}`}></button>
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
