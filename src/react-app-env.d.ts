/// <reference types="react-scripts" />

interface Letter {
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
