import React from "react";
import './HistoryEntry.css';

const HistoryEntry = ({ index, expression, result, onDelete, onEventClick}) => {
    return (
        <div className="history-entry" onClick={() => onEventClick(index)}>
            <div className="history-entry-functions"> <button onClick={() => onDelete(index)} className="delete-button"> x </button></div>
            <div className="expression">{expression}</div>
            <div className="result"> <strong>{result}</strong> </div>
            
        </div>
    );
};

export default HistoryEntry;