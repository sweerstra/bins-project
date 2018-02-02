import React from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import BinList from '../BinList';
import SelectionContainer from '../Selection/Selection';
import './App.css';

const App = () => (
  <div className="App">
    <NavigationBar/>
    <div className="main-content">
      <BinList/>
      <Route path="/:binId?" component={SelectionContainer}/>
    </div>
  </div>
);

export default App;
