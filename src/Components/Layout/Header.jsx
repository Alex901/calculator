import React, { useState, useEffect } from "react";
import './Header.css';

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
}, []);

  return (
    <div className="header">
      <h1>Labb1 - Kalkylator</h1>
      <div> {time.toLocaleTimeString()}</div>
    </div>
  );
};

export default Header;






