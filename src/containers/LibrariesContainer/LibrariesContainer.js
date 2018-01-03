import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDefaultLibraryIfNew, fetchDefaultLibraries, toggleLibraryMenu } from '../../actions/index';
import './LibrariesContainer.css';
import assets from '../../assets/index';

class LibrariesContainer extends Component {
  constructor() {
    super();

    this.state = { libraries: [], filtered: [] };
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
    const { libraries, filtered } = this.state;
    const { librariesVisible, onShowLibraryMenu, onHideLibraryMenu } = this.props;

    if (!librariesVisible) {
      return (
        <div className="libraries-placeholder">
          Libraries
          <img src={assets.plusCircleSmall}
               className="clickable"
               onClick={() => onShowLibraryMenu()}
               alt="Show Libraries"/>
        </div>
      );
    }

    return (
      <div className="Libraries-Container">
        <div className="libraries-header">
          Libraries
          <img src={assets.minusCircle}
               className="clickable"
               onClick={() => onHideLibraryMenu()}
               alt="Hide Libraries"/>
        </div>
        <div className="add-library">
          <input className="textbox"
                 placeholder="Search or add URL"
                 spellCheck="false"
                 onChange={this.onAddLibraryInputChange.bind(this)}
                 onKeyDown={({ keyCode, target }) => {
                   if (keyCode === 13) {
                     this.addSelectedLibrary(target.value);
                     this.input.value = '';
                   }
                 }}
                 ref={input => this.input = input}/>
          {filtered.length === 0 && <div className="add-library-icons">
            <img src={assets.plusCircleSmall}
                 className="clickable"
                 onClick={() => {
                   this.addSelectedLibrary(this.input.value);
                   this.input.value = '';
                 }}
                 alt="Add Library"/>
            <img src={assets.list}
                 className="clickable"
                 onClick={this.showDefaultLibraries.bind(this)}
                 alt="Show Default Libraries"/>
          </div>}
        </div>
        <div className="autocomplete-suggestions">
          {filtered.map((suggestion, index) =>
            <p onClick={() => this.selectDefaultLibrary(suggestion)} key={index}>
              {suggestion.name}
            </p>
          )}
        </div>
        <div className="libraries">
          {libraries.map(({ name, url }, index) =>
            <div className="library" key={index}>
              <a href={url} target="about_blank">{name}</a>
              <img src={assets.x}
                   className="clickable"
                   onClick={() => this.removeSelectedLibrary(url, index)}
                   alt="Remove Library"/>
            </div>
          )}
        </div>
      </div>
    );
  }

  showDefaultLibraries() {
    this.setState({ filtered: this.props.defaultLibraries });
  }

  selectDefaultLibrary(library) {
    this.input.value = library.url;
    this.setState({ filtered: [] });
  }

  onAddLibraryInputChange(e) {
    const { defaultLibraries } = this.props;
    const value = e.target.value.toLowerCase();

    const filtered = value
      ? defaultLibraries.filter(lib => lib.name.toLowerCase().includes(value))
      : [];

    this.setState(({ filtered }));
  }

  addSelectedLibrary(url) {
    const name = url.split('/').pop();
    const library = { name, url };

    this.setState(state => ({ libraries: [...state.libraries, library] }));

    appendScriptToDOM(url);

    // if not in default library list -> add with API call
    this.props.onAddDefaultLibraryIfNew(library);
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
  Array.from(document.querySelectorAll('script')).forEach((script) => {
    if (script.src === src) {
      script.parentNode.removeChild(script);
    }
  });
};

LibrariesContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LibrariesContainer);
