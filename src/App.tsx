import { useEffect, useState } from "react";
import { getSolution } from "./api/solution";

function App() {
  const [solution, setSolution] = useState<string | null>(null);

  const loadSolution = async () => {
    const loadedSolution = await getSolution();

    const randomIndex = Math.floor(Math.random() * loadedSolution.length + 0);

    const randomSolution = loadedSolution[randomIndex];

    setSolution(randomSolution.word);
  }

  useEffect(() => {
    loadSolution();
  },[solution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && (
        <div>{solution}</div>
      )}
    </div>
  );
}

export default App;
