import { useEffect } from 'react';
import './App.scss';
import { Grid } from './components/Grid';
import { Keypad } from './components/Keypad';
import { Modal } from './components/Modal';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { pickSolution } from './redux/wordleReducer';

function App() {
  const wordle = useSelector((state: any) => state);
  const dispatch = useDispatch();  

  const {
    showInstructions,
    solution,
    errorMessage,
    isGameDone,
  } = wordle.wordle;

  useEffect(() => {
    dispatch(pickSolution());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      {showInstructions && (
        <Instructions />
      )}

      {solution && (
        <>
          {errorMessage && (
            <ErrorMessage />
          )}

          <Grid />

          <Keypad />

          {isGameDone && (
            <Modal />
          )}
        </>
      )}
    </div>
  );
}

export default App;
