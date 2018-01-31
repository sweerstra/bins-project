import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBins, removeBin, selectBin } from '../actions/index';
import Bins from '../components/Bins/Bins';

class BinsList extends Component {
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
  removeBin = (e, id) => {
    e.stopPropagation();

    const { selectedBin, onRemoveBin, onSelectBin } = this.props;
    onRemoveBin(id);

    if (id === selectedBin.id) {
      onSelectBin({ id: 0, name: '', selection: '' });
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

BinsList.propTypes = {
  fetching: PropTypes.bool,
  bins: PropTypes.array,
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
  onFetchBins: () => dispatch(fetchBins()),
  onSelectBin: (bin) => dispatch(selectBin(bin)),
  onRemoveBin: (id) => dispatch(removeBin(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BinsList);
