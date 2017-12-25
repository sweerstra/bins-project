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
    const { bins, fetching, dispatch } = this.props;

    const filteredBins = search
      ? bins.filter(bin => bin.name.toLowerCase().includes(search))
      : bins;

    return (
      <aside className="App-sidebar">
        <div className="categories-search">
          <input type="text" onChange={this.handleSearchChange.bind(this)} placeholder="Search bin..."/>
        </div>
        <div className="categories">
          {fetching && <div style={{ padding: '8px' }}>Loading...</div>}
          {filteredBins.map((bin, index) =>
            <div className="category"
                 onClick={() => dispatch(selectBin(bin.id))}
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

const mapStateToProps = ({ bins }) => {
  return bins;
};

export default connect(mapStateToProps)(BinsContainer);
