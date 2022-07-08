const API_URL = 'http://localhost:3001/letters';

export const getLetters = () => {
  return fetch(API_URL)
    .then(response => response.json());
}