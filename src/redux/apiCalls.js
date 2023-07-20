import { getSolution } from "./wordleReducer";

export const fetchSolution = async (dispatch) => {
  const word = await fetch('https://random-word-api.herokuapp.com/word?length=5').then(res => res.json());

  console.log(word);

  dispatch(getSolution(word[0]));
}