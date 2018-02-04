import React from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar';
import BinList from '../../containers/BinList';
import SelectionContainer from '../../containers/Selection/Selection';
import ConsoleLog from '../../containers/ConsoleLog';
import LibraryList from '../../containers/LibraryList';
import './App.css';

const App = () => (
  <div className="App">
    <NavigationBar/>
    <Route path="/" component={BinList}/>
    <Route path="/:binId?" component={SelectionContainer}/>
    <ConsoleLog/>
    <LibraryList/>
  </div>
);

export default App;
