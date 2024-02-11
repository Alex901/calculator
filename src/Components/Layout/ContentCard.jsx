import React from 'react';
import './ContentCard.css';


const ContentCard = ({ children }) => {
  return (
    <div className="content-card">
      {children}
    </div>
  );
};

export default ContentCard;