import React from "react";
import './HistoryEntry.css';

const HistoryEntry = ({ index, expression, result}) => {
    console.log("index", index + " expression: ", expression + "result", result);
    return (
        <li> 
            {index}
            <strong>{expression}</strong>
            {result}
        </li>
    );
};

export default HistoryEntry;