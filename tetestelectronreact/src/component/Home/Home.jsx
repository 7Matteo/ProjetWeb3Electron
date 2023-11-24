import React, { useState, useEffect } from 'react';


const Home = () => {
  const [jokes, setJokes] = useState([]);

  const handleDarkMode = async () => {
    await window.darkMode.toggle();
  };
  return (
    <div>
      <h1>Home</h1>
      <button className='rien' onClick={handleDarkMode}>
        Toggle Dark Mode
      </button>

    </div>
  );
};

export default Home;
