import React from "react";
import './HistoryEntry.css';

const HistoryEntry = ({ expression, result}) => {
    console.log(" expression: ", expression + "result", result);
    return (
        <div className="history-entry">
            <div className="history-entry-functions"> <button className="delete-button"> x </button></div>
            <div className="expression">{expression}</div>
            <div className="result"> <strong>{result}</strong> </div>
            
        </div>
    );
};

export default HistoryEntry;