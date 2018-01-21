import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBins, removeBin, selectBin } from '../../actions/index';
import images from '../../assets/index';
import './Bins.css';

class BinsContainer extends Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  componentDidMount() {
    this.props.onFetchBins();
  }

  render() {
    const { bins, fetching, selectedBin, onSelectBin } = this.props;
    const searchRegex = new RegExp(this.state.search, 'gi');
    const filteredBins = bins.filter(bin => bin.name.match(searchRegex));

    return (
      <aside className="Bins-Container">
        <div className="bins-search">
          <input type="text"
                 onChange={this.handleSearchChange.bind(this)}
                 placeholder="Search for bin..."/>
          <img src={images.search} alt="Search Bin"/>
        </div>
        <div className="bins">
          {fetching && <div className="loading">Loading...</div>}
          {filteredBins.map((bin, index) =>
            <div className={bin.id === selectedBin.id ? 'bin active' : 'bin'}
                 onClick={() => onSelectBin(bin)}
                 key={index}>
              {bin.name}
              <div className="remove-bin"
                   onClick={(e) => this.removeBin(e, bin.id)}>
                <img src={images.x} alt="Remove"/>
              </div>
            </div>
          )}
        </div>
      </aside>
    );
  }

  handleSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  removeBin(e, id) {
    e.stopPropagation();

    const { selectedBin, onRemoveBin, onSelectBin } = this.props;
    onRemoveBin(id);

    if (id === selectedBin.id) {
      onSelectBin({ id: 0, name: '', selection: '' });
    }
  }
}

BinsContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BinsContainer);
