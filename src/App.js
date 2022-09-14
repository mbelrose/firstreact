import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ReviewDetail from './reviewLib/ReviewDetail';
import ReviewList from './reviewLib/ReviewList';
import ReviewUpdate from './reviewLib/ReviewUpdate';
import WelcomePage from './WelcomePage';

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
            <Link to="/reviews/">LIST</Link>
          </div>

          <Routes>
            <Route path="/reviews/" element={<ReviewList />} />
            <Route path="/reviews/:id" element={<ReviewDetail />} />
            <Route path="/reviews/update/:id" element={<ReviewUpdate />} />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </div>

      </reviewContext.Provider>
      </Router>
    );
}

export default App;
