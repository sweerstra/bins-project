import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAndSelectBin } from '../actions';

class NavigationBar extends Component {
  render() {
    const { selectedBin: { id } } = this.props;

    return (
      <header className="App-header">
        <h1 className="App-title">Bins Project</h1>
        {Boolean(id) && <div className="clickable" onClick={this.createNewBin.bind(this)}>
          Create New Bin
        </div>}
      </header>
    );
  }

  createNewBin() {
    const { dispatch } = this.props;
    const bin = prompt('Choose bin name');

    if (bin) {
      dispatch(addAndSelectBin(bin));
    }
  }
}

const mapStateToProps = ({ bins, selectedBin }) => {
  return { ...bins, selectedBin };
};

export default connect(mapStateToProps)(NavigationBar);
