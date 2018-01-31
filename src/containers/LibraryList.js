import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDefaultLibraryIfNew, fetchDefaultLibraries, toggleLibraryMenu } from '../actions/index';
import Libraries from '../components/Libraries/Libraries';

class LibraryList extends Component {
  constructor() {
    super();
    this.state = { libraries: [] };
  }

  componentDidMount() {
    this.props.onFetchDefaultLibraries();
  }

  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { librariesVisible, onShowLibraryMenu, onHideLibraryMenu, defaultLibraries } = this.props;

    return <Libraries
      selectedLibraries={this.state.libraries}
      defaultLibraries={defaultLibraries}
      librariesVisible={librariesVisible}
      onAddSelectedLibrary={this.addSelectedLibrary.bind(this)}
      onRemoveSelectedLibrary={this.removeSelectedLibrary.bind(this)}
      onShowLibraryMenu={onShowLibraryMenu}
      onHideLibraryMenu={onHideLibraryMenu}/>
  }

  addSelectedLibrary(url, isDefaultLibrary = false) {
    const name = url.split('/').pop();
    const library = { name, url };

    this.setState(state => ({ libraries: [...state.libraries, library] }));

    appendScriptToDOM(url);

    // if not in default library list -> add with API call
    if (!isDefaultLibrary) {
      this.props.onAddDefaultLibraryIfNew(library);
    }
  }

  removeSelectedLibrary(url, index) {
    const { libraries } = this.state;
    libraries.splice(index, 1);
    this.setState({ libraries });

    removeScriptFromDOM(url);
  }
}

const appendScriptToDOM = (src) => {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
};

const removeScriptFromDOM = (src) => {
  document.querySelectorAll('script').forEach((script) => {
    if (script.src === src) {
      script.parentNode.removeChild(script);
    }
  });
};

LibraryList.propTypes = {
  librariesVisible: PropTypes.bool,
  defaultLibraries: PropTypes.array
};

const mapStateToProps = ({ libraries }) => {
  return { ...libraries };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchDefaultLibraries: () => dispatch(fetchDefaultLibraries()),
  onAddDefaultLibraryIfNew: (library) => dispatch(addDefaultLibraryIfNew(library)),
  onShowLibraryMenu: () => dispatch(toggleLibraryMenu(true)),
  onHideLibraryMenu: () => dispatch(toggleLibraryMenu(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList);
