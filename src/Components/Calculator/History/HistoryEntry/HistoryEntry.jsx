import React from "react";
import './HistoryEntry.css';

const HistoryEntry = ({ index, expression, result, onDelete}) => {
    return (
        <div className="history-entry">
            <div className="history-entry-functions"> <button onClick={() => onDelete(index)} className="delete-button"> x </button></div>
            <div className="expression">{expression}</div>
            <div className="result"> <strong>{result}</strong> </div>
            
        </div>
    );
};

export default HistoryEntry;