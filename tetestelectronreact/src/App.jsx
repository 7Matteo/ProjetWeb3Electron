import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import Calculator from './component/Calculator/Calculator.jsx';
import Note from './component/Note/Note.jsx';
import Button from './component/Button/Button.jsx';

const App = () => {

  const handleDarkMode = async () => {
    await window.darkMode.toggle();

  }

  return (
    <div>

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calculator">Calculator</Link>
            </li>
            <li>
              <Link to="/note">Note</Link>
            </li>
          </ul>
        </nav>
        <Routes>
  <Route path='/'  element={
    <div>
      <h1>Home</h1>
      <Button onClick={handleDarkMode}>Toggle Dark Mode</Button>
    </div>
  } />
  <Route path="/calculator" element={<Calculator />} />
  <Route path="/note" element={<Note />} />
</Routes>

      </div>
    </Router>

    </div>
  );
  
};

ReactDOM.render(<App />, document.getElementById('app'));
