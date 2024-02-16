import React from "react";
import './History.css';
import HistoryEntry from "./HistoryEntry/HistoryEntry";

const History = ({ history }) => {
    console.log("history: ", history)

    return (
        <div className="history-layout">
            <div className="history-title">
                <p className="history-paragraph"> History</p>
                
            </div>
            
            <div className="history-list"> 

                    {history.map((entry, index) => (
                        <HistoryEntry key={index} expression={entry.currentExpression} result={entry.currentNumber} />
                    ))}
               
            </div>

        </div>
    );
}

export default History;