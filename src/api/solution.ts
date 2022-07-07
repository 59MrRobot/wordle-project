const API_URL = 'http://localhost:3001/solutions';

export const getSolution = () => {
  return fetch(API_URL)
    .then(response => response.json());
}