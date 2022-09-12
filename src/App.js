import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ReviewDetail from './reviewLib/ReviewDetail';

const App = () => {
  const reviewContext = createContext();

    return (
      <Router>
      <reviewContext.Provider value="">

        <div className="App">

          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>

          <div>
            MENU:
            <Link to="/detail/63182cc192b3f2ea552f01fd">DETAIL</Link>
          </div>

          <Routes>
            <Route path="/detail/:id" element={<ReviewDetail />} />
          </Routes>
        </div>

      </reviewContext.Provider>
      </Router>
    );
}

export default App;
