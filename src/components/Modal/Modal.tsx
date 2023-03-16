import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { resetGame } from '../../redux/wordleReducer';
import './Modal.scss';

export const Modal: React.FC = React.memo(
  () => {
    const dispatch = useDispatch();
    const wordle = useSelector((state: any) => state);
    const { solution, turn, isCorrect } = wordle.wordle;

    return (
      <div className="modal">
        <div className="modal__message">
            {isCorrect && (
              <>
                <h1>You Win!</h1>
                <p className="modal__solution modal__solution--win">
                  {solution}
                </p>
                <p>
                  {`You found the solution in ${turn} ${turn === 1 ? 'guess' : 'guesses'} :)`}
                </p>
              </>
            )}
            {!isCorrect && (
              <>
                <h1>Unlucky!</h1>
                <h2 className="modal__solution modal__solution--lose">
                  {solution}
                </h2>
                <p>Better luck next time :)</p>
              </>
            )}

            <button
              type="button"
              className="modal__button"
              onClick={() => dispatch(resetGame())}
            >
              NEW GAME
            </button>
          </div>
      </div>
    );
  }
);
