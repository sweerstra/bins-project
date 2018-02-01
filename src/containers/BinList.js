import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBins, removeBin, selectBin } from '../actions/index';
import Bins from '../components/Bins/Bins';

class BinList extends Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  componentDidMount() {
    this.props.onFetchBins();
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };
  removeBin = (e, _id) => {
    e.stopPropagation();

    const { selectedBin, onRemoveBin, onSelectBin } = this.props;
    onRemoveBin(_id);

    if (_id === selectedBin._id) {
      onSelectBin({ _id: '', name: '', selection: '' });
    }
  };

  render() {
    const searchRegex = new RegExp(this.state.search, 'gi');
    const filteredBins = this.props.bins.filter(bin => bin.name.match(searchRegex));

    return (
      <Bins {...this.props}
            bins={filteredBins}
            onSearchBin={this.handleSearchChange}
            onRemoveBin={this.removeBin}/>
    );
  }
}

BinList.propTypes = {
  fetching: PropTypes.bool,
  bins: PropTypes.array,
  selectedBin: PropTypes.shape({
    _id: PropTypes.number,
    name: PropTypes.string,
    selection: PropTypes.string
  })
};

const mapStateToProps = ({ bins, selectedBin }) => {
  return { ...bins, selectedBin };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchBins: () => dispatch(fetchBins()),
  onSelectBin: (bin) => dispatch(selectBin(bin)),
  onRemoveBin: (_id) => dispatch(removeBin(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BinList);
