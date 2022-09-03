import React, { createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ReviewDetail from './starLib/ReviewDetail';

const App = () => {
  const starContext = createContext();

    return (
      <starContext.Provider value="">

        <div className="App">

          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>

          <div>
            MENU:
            <Link to="/detail">DETAIL</Link>
          </div>

          <Routes>
            <Route path="/detail" element={<ReviewDetail />}/>
          </Routes>
        </div>

      </starContext.Provider>
    );
}

export default App;
