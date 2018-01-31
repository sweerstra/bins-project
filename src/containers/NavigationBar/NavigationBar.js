import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectBin } from '../../actions/index';
import images from '../../assets/images';
import './NavigationBar.css';

const NavigationBar = ({ selectedBin, onCreateBin }) => (
  <header className="Navigation-Container">
    <h1 className="Navigation-Container-title">Bins Project</h1>
    {selectedBin.id !== 0 && <img className="clickable"
                                  src={images.plus}
                                  onClick={onCreateBin}
                                  alt="Create Bin"
                                  title="Create Bin"/>}
  </header>
);

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
  onCreateBin: () => dispatch(selectBin({ id: 0, name: '', selection: '' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
