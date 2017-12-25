import React from 'react';
import { connect } from 'react-redux';
import { addBin } from '../actions';

const NavigationBar = ({ dispatch }) => (
  <header className="App-header">
    <h1 className="App-title">Bins Project</h1>
    <div className="add" onClick={() => {
      const bin = prompt('Choose bin name');

      if (bin) {
        dispatch(addBin(bin));
      }
    }}>+
    </div>
  </header>
);

export default connect()(NavigationBar);
