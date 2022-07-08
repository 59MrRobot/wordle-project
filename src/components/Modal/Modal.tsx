import React from 'react';
import './Modal.scss';

interface Props {
  isCorrect: boolean;
  turn: number;
  solution: string;
}

export const Modal: React.FC<Props> = React.memo(
  ({ isCorrect, turn, solution }) => (
    <div className="modal">
      {isCorrect && (
        <div className="modal__message">
          <h1>You Win!</h1>
          <p className="modal__solution modal__solution--win">{solution}</p>
          <p>{`You found the solution in ${turn} ${turn === 1 ? 'guess' : 'guesses'} :)`}</p>
        </div>
      )}

      {!isCorrect && (
        <div className="modal__message">
          <h1>Unlucky!</h1>
          <h2 className="modal__solution modal__solution--lose">{solution}</h2>
          <p>Better luck next time :)</p>
        </div>
      )}
    </div>
  )
);
