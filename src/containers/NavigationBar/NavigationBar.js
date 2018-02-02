import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectBin } from '../../actions/index';
import { Link } from 'react-router-dom';
import images from '../../assets/images';
import './NavigationBar.css';

const NavigationBar = ({ selectedBin, onCreateBin }) => (
  <header className="Navigation-Container">
    <Link to={'/'} className="Navigation-Container-title">Bins Project</Link>
    {Boolean(selectedBin._id) && <img className="clickable"
                                      src={images.plus}
                                      onClick={onCreateBin}
                                      alt="Create Bin"
                                      title="Create Bin"/>}
  </header>
);

NavigationBar.propTypes = {
  selectedBin: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    selection: PropTypes.string
  })
};

const mapStateToProps = ({ bins }) => {
  return { ...bins };
};

const mapDispatchToProps = (dispatch) => ({
  onCreateBin: () => dispatch(selectBin({ _id: '', name: '', selection: '' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
