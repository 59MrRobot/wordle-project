import { useEffect, useState } from "react";
import { getSolution } from "./api/solution";
import { Wordle } from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);

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
        <Wordle solution={solution} />
      )}
    </div>
  );
}

export default App;
