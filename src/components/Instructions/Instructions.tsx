import React from 'react';
import { Example } from '../Example';
import './Instructions.scss';

interface Props {
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Instructions: React.FC<Props> = ({ setShowInstructions }) => {
  return (
    <div className="Instructions">
      <div className="Instructions__wrapper">
        <div className="Instructions__controls">
          <div></div>
          <h2 className="Instructions__title">How to play</h2>
          <button 
            type="button" 
            className="Instructions__close"
            onClick={() => setShowInstructions(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" data-testid="icon-close">
              <path fill="var(--color-tone-1)" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </button>
        </div>

        <div className="Instructions__content">
          <p>
            Guess the <strong>WORDLE</strong> in six tries.
          </p>

          <p>
            Each guess must be a valid five-letter word. Hit the enter button to submit.
          </p>

          <p>
            After each guess, the color of the tiles will change to show how close your guess was to the word.
          </p>

          <div className="Instructions__examples">
            <p><strong>Examples</strong></p>
            <Example letters={['w', 'e', 'a', 'r', 'y']} />
            <p>The letter <strong>W</strong> is in the correct spot.</p>

            <Example letters={['p', 'i', 'l', 'l', 's']} />
            <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>

            <Example letters={['v', 'a', 'g', 'u', 'e']} />
            <p>The letter <strong>U</strong> is not in the word in any spot.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
