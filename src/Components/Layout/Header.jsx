import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <h1>Labb1 - Kalkylator</h1>
      <nav className="navbar">
        <ul>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
        </ul>
     </nav>
    </div>
  );
};

export default Header;