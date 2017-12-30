import React from 'react';
import NavigationBar from '../NavigationContainer/NavigationContainer';
import BinsContainer from '../BinsContainer/BinsContainer';
import SelectionContainer from '../SelectionContainer/SelectionContainer';
import './App.css';

const App = () => (
  <div className="App">
    <NavigationBar/>
    <div className="main-content">
      <BinsContainer/>
      <SelectionContainer/>
    </div>
  </div>
);

export default App;
