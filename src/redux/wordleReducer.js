/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const wordleSlice = createSlice({
  name: 'wordle',
  initialState: {
    showInstructions: true,
    solution: '',
    isFetchSolution: true,
    turn: 0,
    currentGuess: '',
    guesses: [...Array(6)],
    history: [],
    isCorrect: false,
    usedKeys: {},
    isGameDone: false,
    errorMessage: '',
    theme: 'light',
  },
  reducers: {
    updateShowInstructions: (state, action) => {
      state.showInstructions = action.payload;
    },
    getSolution: (state, action) => {
      state.solution = action.payload;
    },
    updateFetchSolution: (state, action) => {
      state.isFetchSolution = action.payload;
    },
    increaseTurn: (state) => {
      state.turn += 1;
    },
    updateCurrentGuess: (state, action) => {
      state.currentGuess = action.payload;
    },
    updateGuesses: (state, action) => {
      const newGuesses = [...state.guesses];

      newGuesses[state.turn] = action.payload;

      state.guesses = newGuesses;
    },
    updateHistory: (state, action) => {
      state.history = action.payload;
    },
    isGuessCorrect: (state, action) => {
      state.isCorrect = action.payload;
    },
    updateUsedKeys: (state, action) => {
      state.usedKeys = action.payload;
    },
    updateGameResult: (state, action) => {
      state.isGameDone = action.payload;
    },
    resetGame: (state) => {
      state.isFetchSolution = true;
      state.turn = 0;
      state.currentGuess = "";
      state.guesses = [...Array(6)];
      state.history = [];
      state.isCorrect = false;
      state.usedKeys = {};
      state.isGameDone = false;
    },
    updateErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    changeTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  },
});

export const {
  updateShowInstructions,
  getSolution,
  updateFetchSolution,
  increaseTurn,
  updateCurrentGuess,
  updateGuesses,
  updateHistory,
  isGuessCorrect,
  updateUsedKeys,
  updateGameResult,
  resetGame,
  updateErrorMessage,
  changeTheme,
} = wordleSlice.actions;

export default wordleSlice.reducer;
