import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';
import './Key.scss';
import { useSelector } from 'react-redux/es/exports';
import { Guess, Letter, State, Wordle } from '../../react-app-env';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import {
  increaseTurn,
  isGuessCorrect,
   updateCurrentGuess,
  updateErrorMessage,
  updateGameResult,
  updateGuesses,
  updateHistory,
  updateUsedKeys
} from '../../redux/wordleReducer';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

interface Props {
  letter: {key: string};
  keyColor: string;
};

export enum Colors {
  Grey = 'grey',
  Yellow = 'yellow',
  Green = 'green',
}

export const Key: React.FC<Props> = React.memo(
  ({ letter, keyColor }) => {
    const wordle: Wordle = useSelector((state: State) => state.wordle);
    const dispatch = useDispatch();
    const {
      solution,
      turn,
      currentGuess,
      history,
      usedKeys,
      isCorrect,
      theme,
    } = wordle;

    const formatGuess = useCallback(
      () => {
        const solutionArray = solution.split('');
        const formattedGuess = currentGuess.split('').map(
          (letter: string) => (
            {
              key: letter,
              color: Colors.Grey,
            }
          )
        );

        formattedGuess.forEach((letter: Letter, index: number) => {
          if (solutionArray[index] === letter.key) {
            formattedGuess[index].color = Colors.Green;
            solutionArray[index] = '_';
          }
        });
  
        formattedGuess.forEach((letter: Letter, index: number) => {
          if (solutionArray.includes(letter.key) && letter.color !== Colors.Green) {
            formattedGuess[index].color = Colors.Yellow;
            solutionArray[solutionArray.indexOf(letter.key)] = '_';
          }
        });
  
        return formattedGuess;
      },
      [currentGuess, solution],
    );

    const addNewGuess = useCallback(
      (formattedGuess: Guess) => {
        if (currentGuess === solution) {
          dispatch(isGuessCorrect(true));
        }

        dispatch(updateGuesses(formattedGuess));
  
        dispatch(updateHistory([...history, currentGuess]));
  
        dispatch(increaseTurn());
  
        const newKeys = {...usedKeys};

          formattedGuess.forEach((letter: Letter) => {
            const currentColor = newKeys[letter.key];
  
            if (letter.color === Colors.Green) {
              newKeys[letter.key] = Colors.Green;
              return;
            }
  
            if (letter.color === Colors.Yellow && currentColor !== Colors.Green) {
              newKeys[letter.key] = Colors.Yellow;
              return;
            }
  
            if (letter.color === Colors.Grey && currentColor !== Colors.Yellow && currentColor !== Colors.Green) {
              newKeys[letter.key] = Colors.Grey;
              return;
            }
          });
        dispatch(updateUsedKeys(newKeys));
  
        dispatch(updateCurrentGuess(''));
      },
      [currentGuess, dispatch, history, solution, usedKeys],
    );

    const handleKeyup = useCallback(
      ({ key }: { key: string }) => {
        if (key === 'Enter') {
          if (currentGuess.length !== 5) {
            dispatch(updateErrorMessage('Word must be 5 letters'));
            return;
          }
  
          if (history.includes(currentGuess)) {
            dispatch(updateErrorMessage('You\'ve already guessed that word'));
            return;
          }
  
          const formattedGuess = formatGuess();
  
          addNewGuess(formattedGuess);
        }
  
        if (key === 'Backspace') {
          dispatch(updateCurrentGuess(currentGuess.slice(0, -1)));
          return;
        }
  
        if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5 && updateCurrentGuess) {
          dispatch(updateCurrentGuess(currentGuess + key));
          dispatch(updateErrorMessage(''));
          return;
        }
      }, [addNewGuess, dispatch, formatGuess, currentGuess, history]);

    const handleClick = useCallback(
      (key: string ) => {
        if (key === 'Enter') {
          if (currentGuess.length !== 5) {
            dispatch(updateErrorMessage('Word must be 5 letters'));
            return;
          }
  
          if (history.includes(currentGuess)) {
            dispatch(updateErrorMessage('You\'ve already guessed that word'));
            return;
          }
  
          const formattedGuess = formatGuess();
  
          addNewGuess(formattedGuess);
        }
  
        if (key === 'Back') {
          dispatch(updateCurrentGuess(currentGuess.slice(0, -1)));
          return;
        }
  
        if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
          dispatch(updateCurrentGuess(currentGuess + key));
          dispatch(updateErrorMessage(''));
          return;
        }
      }, [addNewGuess, dispatch, formatGuess, currentGuess, history]);

    useEffect(() => {
      window.addEventListener('keyup', handleKeyup);
  
      if (isCorrect) {
        setTimeout(() => dispatch(updateGameResult(true)), 2000);
        window.removeEventListener('keyup', handleKeyup);
      }
  
      if (turn > 5) {
        setTimeout(() => dispatch(updateGameResult(true)), 2000);
        window.removeEventListener('keyup', handleKeyup);
      }
  
      return () => window.removeEventListener('keyup', handleKeyup);
    }, [dispatch, handleKeyup, isCorrect, turn]);

    return (
      <button
        type="button"
        id={letter.key}
        className={cn(
          'key',
          `key--${theme}`,
          `key--${keyColor}`,
          { 'key--big': letter.key === 'Enter' || letter.key === 'Back' }
        )}
        onClick={() => {
          handleClick(letter.key);
        }}
      >
        {letter.key === 'Back'
          ? (<BackspaceOutlinedIcon />)
          : (letter.key.toUpperCase())
        }
      </button>
    );
  },
);

