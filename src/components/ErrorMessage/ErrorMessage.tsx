import React from 'react';
import './ErrorMessage.scss';

interface Props {
  errorMessage: string;
}

export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => (
  <div className="error">
    <p className="error__message">{errorMessage}</p>
  </div>
);

