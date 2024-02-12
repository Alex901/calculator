import React from "react";
import './Display.css';

const Display = ({expression, currentNumber}) => {
   // currentNumber = "0";
   // expression = "0"
    return (
        <div className="display">
            <div className="Expression"> { expression } </div>
            <div className="CurrentNumber"> { currentNumber  } </div>
        </div>
    );
};

export default Display;