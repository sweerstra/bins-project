import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAndSelectBin } from '../actions';
import assets from '../assets';

class NavigationBar extends Component {
  render() {
    const { selectedBin: { id } } = this.props;

    return (
      <header className="App-header">
        <h1 className="App-title">Bins Project</h1>
        {Boolean(id) && <img className="clickable"
                             src={assets.plus}
                             onClick={this.createNewBin.bind(this)}
                             alt="Create Bin"
                             title="Create Bin"/>}
      </header>
    );
  }

  createNewBin() {
    const { dispatch } = this.props;
    const bin = prompt('Choose new bin name');

    if (bin) {
      dispatch(addAndSelectBin(bin));
    }
  }
}

const mapStateToProps = ({ bins, selectedBin }) => {
  return { ...bins, selectedBin };
};

export default connect(mapStateToProps)(NavigationBar);
