import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAndSelectBin } from '../../actions/index';
import assets from '../../assets/index';
import './NavigationContainer.css';

class NavigationBar extends Component {
  constructor() {
    super();

    this.state = { editing: false };
  }

  componentDidUpdate() {
    if (this.editingInput) {
      this.editingInput.focus();
    }
  }

  render() {
    const { editing } = this.state;
    const { selectedBin: { id } } = this.props;

    return (
      <header className="Navigation-Container">
        <h1 className="Navigation-Container-title">Bins Project</h1>
        {(Boolean(id) && !editing ) && <img className="clickable"
                                            src={assets.plus}
                                            onClick={this.edit.bind(this)}
                                            alt="Create Bin"
                                            title="Create Bin"/>}
        {editing && <div className="add-bin">
          <input
            className="textbox"
            type="text"
            onKeyDown={(e) => this.onBinNameKeyDown(e)}
            ref={(textbox) => {
              this.editingInput = textbox;
            }}/>
          <img className="clickable"
               src={assets.plusCircleSmall}
               onClick={this.addBinClick.bind(this)}
               alt="Add Bin"/>
        </div>}
      </header>
    );
  }

  edit() {
    this.setState({ editing: true });
  }

  onBinNameKeyDown(event) {
    if (event.keyCode === 13) {
      const name = event.target.value;
      if (name) this.addBin(name);
      this.setState({ editing: false });
    }
  }

  addBinClick() {
    if (this.editingInput) {
      const name = this.editingInput.value;
      if (name) {
        this.addBin(name);
        this.setState({ editing: false });
      }
    }
  }

  addBin(name) {
    const { dispatch } = this.props;
    dispatch(addAndSelectBin(name));
  }
}

const mapStateToProps = ({ bins, selectedBin }) => {
  return { ...bins, selectedBin };
};

export default connect(mapStateToProps)(NavigationBar);
