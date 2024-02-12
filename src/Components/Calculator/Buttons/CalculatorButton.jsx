import React from 'react';
import './CalculatorButton.css';

const CalculatorButton = ({ value, onClick, disabled, customClass }) => {
  
  return (
      <button className={`CalculatorButton ${customClass}`} onClick={() => onClick(value)} disabled={disabled}>
        {value}
      </button>
  );
};

export default CalculatorButton;