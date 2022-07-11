import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import './ErrorMessage.scss';

export const ErrorMessage: React.FC = () => {
  const { errorMessage } = useContext(AppContext);
  
  return (
    <div className="error">
      <p className="error__message">{errorMessage}</p>
    </div>
  );
};

