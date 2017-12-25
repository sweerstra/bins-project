import React from 'react';
import { connect } from 'react-redux';
import { addAndSelectBin } from '../actions';

const NavigationBar = ({ dispatch }) => (
  <header className="App-header">
    <h1 className="App-title">Bins Project</h1>
    <div className="clickable" onClick={() => {
      const bin = prompt('Choose bin name');

      if (bin) {
        dispatch(addAndSelectBin(bin));
      }
    }}>
      Create New Bin
    </div>
  </header>
);

export default connect()(NavigationBar);
