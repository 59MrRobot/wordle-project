/// <reference types="react-scripts" />

export interface Letter {
  key: string;
  color: string;
}

export type Guess = Letter[];

export interface Letter {
  key: string;
}

export enum Themes {
  Light = 'light',
  Dark = 'dark',
}

interface Wordle {
  showInstructions: string;
  solution: string;
  turn: number;
  currentGuess: "";
  guesses: Guess[];
  history: string[];
  isCorrect: boolean;
  usedKeys: any;
  isGameDone: boolean;
  errorMessage: string,
}

interface State {
  wordle: Wordle;
}
