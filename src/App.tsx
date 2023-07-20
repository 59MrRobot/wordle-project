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
import { updateFetchSolution } from './redux/wordleReducer';
import { State, Wordle } from './react-app-env';
import { fetchSolution } from './redux/apiCalls';

function App() {
  const wordle: Wordle = useSelector((state: State) => state.wordle);
  const dispatch = useDispatch();  

  const {
    showInstructions,
    solution,
    isFetchSolution,
    errorMessage,
    isGameDone,
    theme,
  } = wordle;

  useEffect(() => {
    // dispatch(pickSolution());
    if (isFetchSolution) {
      fetchSolution(dispatch);
      dispatch(updateFetchSolution(false));
    }
  }, [dispatch, isFetchSolution]);

  return (
    <div className={`App App--${theme}`}>
      <Header />

      {showInstructions && (
        <Instructions />
      )}

      {solution && (
        <div className="App__container">
          {errorMessage && (
            <ErrorMessage />
          )}

          <Grid />

          <Keypad />

          {isGameDone && (
            <Modal />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
