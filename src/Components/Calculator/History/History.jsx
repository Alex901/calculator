import React from "react";
import './History.css';
import HistoryEntry from "./HistoryEntry/HistoryEntry";

const History = ({ history }) => {
    console.log("history: ", history)

    return (
        <div className="history-layout">
            <div className="history-title">
                <h4> History</h4>
            </div>
            <div className="history-list"> 
                <ul> 
                    {history.map((entry, index) => (
                        <HistoryEntry key={index} expression={entry.expression} result={entry.result} />
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default History;