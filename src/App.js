import React, { useState, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import StarRating from './starLib/StarRating';


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
          <Link url='detail'>detail!</Link>
        </div>
      </div>
      </starContext.Provider>
    );  
}

export default App;
