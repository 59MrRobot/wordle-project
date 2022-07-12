import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import './Modal.scss';

interface Props {
  onNewGame: () => void;
}

export const Modal: React.FC<Props> = React.memo(
  ({ onNewGame }) => {
    const { isCorrect, turn, solution } = useContext(AppContext);

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
              onClick={() => {
                onNewGame();
              }}
            >
              NEW GAME
            </button>
          </div>
      </div>
    );
  }
);
