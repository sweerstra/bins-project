import React from 'react';
import NavigationBar from '../Navigation/Navigation';
import BinsContainer from '../Bins/Bins';
import SelectionContainer from '../Selection/Selection';
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
