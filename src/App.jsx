import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes , Link } from 'react-router-dom'; // Import Link

import Calculator from './component/Calculator/Calculator.jsx';
import Note from './component/Note/Note.jsx';
import Home from './component/Home/Home.jsx';

const App = () => {


  return (
    <Router>
        <nav >
          <ul class = 'navbarUl'>
            <li >
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
  <Route path='/' element={<Home/>} />
  <Route path="/calculator" element={<Calculator />} />
  <Route path="/note" element={<Note />} />
</Routes>
    </Router>
  );
  
};

ReactDOM.render(<App />, document.getElementById('app'));
