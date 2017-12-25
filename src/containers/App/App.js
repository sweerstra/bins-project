import React from 'react';
import NavigationBar from '../NavigationBar';
import BinsContainer from '../BinsContainer';
import SelectionContainer from '../SelectionContainer';
import './App.css';

const App = () => (
  <div className="App">
    <NavigationBar/>
    <div className="content">
      <BinsContainer/>
      <SelectionContainer/>
    </div>
  </div>
);

export default App;
