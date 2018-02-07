import React from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import BinList from '../containers/BinList';
import SelectionContainer from '../containers/Selection/Selection';
import ConsoleLog from '../containers/ConsoleLog';
import LibraryList from '../containers/LibraryList';
import './editor.css';

const Editor = () => (
  <div className="editor">
    <NavigationBar/>
    <Route path="/bin" component={BinList}/>
    <Route path="/bin/:binId?" component={SelectionContainer}/>
    <ConsoleLog/>
    <LibraryList/>
  </div>
);

export default Editor;
