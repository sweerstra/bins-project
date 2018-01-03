import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAndSelectBin } from '../../actions/index';
import images from '../../assets/index';
import './Navigation.css';

class NavigationBar extends Component {
  constructor() {
    super();
    this.state = { editing: false };
  }

  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { editing } = this.state;
    const selectedBinId = this.props.selectedBin.id;

    return (
      <header className="Navigation-Container">
        <h1 className="Navigation-Container-title">Bins Project</h1>
        {(Boolean(selectedBinId) && !editing ) && <img className="clickable"
                                                       src={images.plus}
                                                       onClick={this.edit.bind(this)}
                                                       alt="Create Bin"
                                                       title="Create Bin"/>}
        {editing && <div className="add-bin">
          <input
            className="textbox"
            type="text"
            onKeyDown={(e) => this.onBinNameKeyDown(e)}
            ref={textbox => this.input = textbox}/>
          <img className="clickable"
               src={images.plusCircleSmall}
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
      if (name) this.props.onAddAndSelectBin(name);
      this.setState({ editing: false });
    }
  }

  addBinClick() {
    if (this.input) {
      const name = this.input.value;
      if (name) {
        this.props.onAddAndSelectBin(name);
        this.setState({ editing: false });
      }
    }
  }
}

NavigationBar.propTypes = {
  selectedBin: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    selection: PropTypes.string
  })
};

const mapStateToProps = ({ bins, selectedBin }) => {
  return { ...bins, selectedBin };
};

const mapDispatchToProps = (dispatch) => ({
  onAddAndSelectBin: (name) => dispatch(addAndSelectBin(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
