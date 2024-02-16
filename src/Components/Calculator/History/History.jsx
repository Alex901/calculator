import React from "react";
import './History.css';
import HistoryEntry from "./HistoryEntry/HistoryEntry";

const History = ({ history, onDelete }) => {

    return (
        <div className="history-layout">
            <div className="history-title">
                <p className="history-paragraph"> History</p>
            </div>

            <div className="history-list">
                {history.map((entry, key) => (
                    <HistoryEntry
                        index={key}
                        expression={entry.currentExpression}
                        result={entry.currentNumber} 
                        onDelete={onDelete}
                        />
                ))}
            </div>
        </div>
    );
}

export default History;