import React from 'react';
import Navigation from '../NavigationBar/NavigationBar';
import BinList from '../BinList';
import SelectionContainer from '../Selection/Selection';
import './App.css';

const App = () => (
  <div className="App">
    <Navigation/>
    <div className="main-content">
      <BinList/>
      <SelectionContainer/>
    </div>
  </div>
);

export default App;
