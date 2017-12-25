import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBins, selectBin } from '../actions'

class BinsContainer extends Component {
  state = { search: '' };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBins());
  }

  render() {
    const search = this.state.search.toLowerCase();
    const { bins, fetching, selectedBin, dispatch } = this.props;

    const filteredBins = search
      ? bins.filter(bin => bin.name.toLowerCase().includes(search))
      : bins;

    return (
      <aside className="sidebar">
        <div className="bins-search">
          <input type="text" onChange={this.handleSearchChange.bind(this)} placeholder="Search bin..."/>
        </div>
        <div className="bins">
          {fetching && <div style={{ padding: '8px' }}>Loading...</div>}
          {filteredBins.map((bin, index) =>
            <div className={bin.id === selectedBin.id ? 'bin active' : 'bin'}
                 onClick={() => dispatch(selectBin(bin))}
                 key={index}>{bin.name}</div>
          )}
        </div>
      </aside>
    );
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }
}

const mapStateToProps = ({ bins, selectedBin }) => {
  return { ...bins, selectedBin };
};

export default connect(mapStateToProps)(BinsContainer);
