import React from 'react';
import Navigation from '../NavigationBar/NavigationBar';
import BinsList from '../BinsList';
import SelectionContainer from '../Selection/Selection';
import './App.css';

const App = () => (
  <div className="App">
    <Navigation/>
    <div className="main-content">
      <BinsList/>
      <SelectionContainer/>
    </div>
  </div>
);

export default App;
