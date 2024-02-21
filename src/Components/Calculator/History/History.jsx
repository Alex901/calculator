import React from "react";
import './History.css';
import HistoryEntry from "./HistoryEntry/HistoryEntry";

const History = ({ history, onDelete, onEventClick }) => {

    return (
        <div className="history-layout">
            <div className="history-title">
                <p className="history-paragraph"> History</p>
            </div>

            <div className="history-list" style={{display: history.length > 0 ? 'grid' : 'none'}}>
                {history.map((entry, key) => (
                    // eslint-disable-next-line react/jsx-key
                    <HistoryEntry
                        index={key}
                        expression={entry.currentExpression}
                        result={entry.currentNumber} 
                        onDelete={onDelete}
                        onEventClick={onEventClick}
                        />
                ))}
            </div>
        </div>
    );
}

export default History;