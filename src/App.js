import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Star from './starLib/star';


const App = () => {
  const starContext = createContext();
    return (
      <starContext.Provider value="">
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Star/>
      </div>
      </starContext.Provider>
    );  
}

export default App;
