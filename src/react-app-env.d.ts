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

interface State {
  solution: string;
  turn: number;
  currentGuess: "";
  // guesses: [...Array(6)];
  // history: [];
  isCorrect: boolean;
  // usedKeys: {};
  isGameDone: boolean;
}
