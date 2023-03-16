import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../react-app-env';
import './ErrorMessage.scss';

export const ErrorMessage: React.FC = () => {
  const errorMessage = useSelector((state: State) => state).wordle.errorMessage;
  
  return (
    <div className="error">
      <p className="error__message">{errorMessage}</p>
    </div>
  );
};

