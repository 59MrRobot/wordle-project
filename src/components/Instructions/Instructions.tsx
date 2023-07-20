import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateShowInstructions } from '../../redux/wordleReducer';
import { Example } from '../Example';
import './Instructions.scss';
import CloseIcon from '@mui/icons-material/Close';
import { State } from '../../react-app-env';

export const Instructions: React.FC = () => {
  const theme = useSelector((state: State) => state.wordle).theme;
  const dispatch = useDispatch();

  return (
    <div className={`Instructions Instructions--${theme}`}>
      <div className={`Instructions__wrapper Instructions__wrapper--${theme}`}>
        <div className="Instructions__controls">
          <button
            type="button"
            className="Instructions__close"
            onClick={() => dispatch(updateShowInstructions(false))}
          >
            <CloseIcon style={
              { color: theme === "light" ? "#000" : "#fff"}
            }/>
          </button>
        </div>

        <div className="Instructions__content">
          <h2 className="Instructions__title">How to play</h2>

          <p className="Instructions__subheading">
            Guess the Wordle in 6 tries.
          </p>

          <ul className="Instructions__list">
            <li className="Instructions__item">
              Each guess must be a valid 5-letter word.
            </li>

            <li className="Instructions__item">
              The color of the tiles will change to show how close your guess was to the word.
            </li>
          </ul>

          <div className={`Instructions__examples Instructions__examples--${theme}`}>
            <p><strong>Examples</strong></p>

            <div className="Instructions__examples-item">
              <Example letters={['w', 'e', 'a', 'r', 'y']} />

              <p style={{ marginTop: "8px" }}><strong>W</strong> is in the word and in the correct spot.</p>
            </div>


            <div className="Instructions__examples-item">
              <Example letters={['p', 'i', 'l', 'l', 's']} />

              <p style={{ marginTop: "8px" }}><strong>I</strong> is in the word but in the wrong spot.</p>
            </div>


            <div className="Instructions__examples-item">
              <Example letters={['v', 'a', 'g', 'u', 'e']} />

              <p style={{ marginTop: "8px" }}><strong>U</strong> is not in the word in any spot.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
