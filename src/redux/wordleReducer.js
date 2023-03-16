/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import data from '../api/data.json';

const pickRandomSolution = () => {
  const randomIndex = Math.floor(Math.random() * data.solutions.length);

  const randomSolution = data.solutions[randomIndex];

  console.log(randomSolution.word);
  return randomSolution.word;
}

const wordleSlice = createSlice({
  name: 'wordle',
  initialState: {
    showInstructions: true,
    solution: '',
    turn: 0,
    currentGuess: '',
    guesses: [...Array(6)],
    history: [],
    isCorrect: false,
    usedKeys: {},
    isGameDone: false,
    errorMessage: '',
  },
  reducers: {
    updateShowInstructions: (state, action) => {
      state.showInstructions = action.payload;
    },
    pickSolution: (state) => {
      state.solution = pickRandomSolution();
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
      state.solution = pickRandomSolution();
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
  },
});

export const {
  updateShowInstructions,
  pickSolution,
  increaseTurn,
  updateCurrentGuess,
  updateGuesses,
  updateHistory,
  isGuessCorrect,
  updateUsedKeys,
  updateGameResult,
  resetGame,
  updateErrorMessage,
} = wordleSlice.actions;

export default wordleSlice.reducer;
