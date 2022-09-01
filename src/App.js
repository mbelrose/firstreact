import React, { useState, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import StarRating from './ratingLib/StarRating';


const App = () => {
  const starContext = createContext();
  const [rating, setRating] = useState(2);

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
        <StarRating rating={rating} setRating={setRating}/>
      </div>
      </starContext.Provider>
    );  
}

export default App;
