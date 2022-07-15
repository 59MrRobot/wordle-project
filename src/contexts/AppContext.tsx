import React from "react";
import { Guess } from "../react-app-env";

interface Context {
  solution: string,
  currentGuess: string,
  guesses: Guess[],
  turn: number,
  errorMessage: string,
  handleClick: (key: string) => void,
  usedKeys: any;
  isCorrect: boolean;
}

export const AppContext = React.createContext<Context>({
  solution: '',
  currentGuess: '',
  guesses: [],
  turn: 0,
  errorMessage: '',
  handleClick: () => {},
  usedKeys: {},
  isCorrect: false,
});