import { useCallback, useEffect, useState } from 'react';
import { Wordle } from "./components/Wordle/Wordle";

import data from './api/data.json';

function App() {
  const [solution, setSolution] = useState<string>('');

  const loadSolution = useCallback(
    async () => {
      const randomIndex = Math.floor(Math.random() * data.solutions.length);

      const randomSolution = data.solutions[randomIndex];

      setSolution(randomSolution.word);
    }, []);

  useEffect(() => {
    loadSolution();
  },[loadSolution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && (
        <Wordle solution={solution} />
      )}
    </div>
  );
}

export default App;
