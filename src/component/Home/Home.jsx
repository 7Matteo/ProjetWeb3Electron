import React from 'react';


const Home = () => {

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
