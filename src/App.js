import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ReviewDetail from './reviewLib/ReviewDetail';
import ReviewList from './reviewLib/ReviewList';
import ReviewUpdate from './reviewLib/ReviewUpdate';
import ReviewInsert from './reviewLib/ReviewInsert';
import ReviewDelete from './reviewLib/ReviewDelete';
import WelcomePage from './WelcomePage';

export default function App () {
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
            <Link to="/reviews/">LIST</Link>&nbsp;
            <Link to="/reviews/insert/">INSERT</Link>
          </div>

          <Routes>
            <Route path="/reviews/insert/" element={<ReviewInsert />} />
            <Route path="/reviews/update/:id" element={<ReviewUpdate />} />
            <Route path="/reviews/delete/:id" element={<ReviewDelete />} />
            <Route path="/reviews/:id" element={<ReviewDetail />} />
            <Route path="/reviews/" element={<ReviewList />} />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </div>

      </reviewContext.Provider>
      </Router>
    );
}