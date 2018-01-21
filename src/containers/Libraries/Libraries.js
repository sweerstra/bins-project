import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDefaultLibraryIfNew, fetchDefaultLibraries, toggleLibraryMenu } from '../../actions/index';
import './Libraries.css';
import images from '../../assets/index';

class LibrariesContainer extends Component {
  constructor() {
    super();
    this.state = { libraries: [], filtered: [] };
  }

  componentDidMount() {
    this.props.onFetchDefaultLibraries();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultLibraries.length > this.props.defaultLibraries.length) {
      this.setState({ filtered: nextProps.defaultLibraries });
    }
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
          <img src={images.plusCircleSmall}
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
          <img src={images.minusCircle}
               className="clickable"
               onClick={() => onHideLibraryMenu()}
               alt="Hide Libraries"/>
        </div>
        <form className="add-library"
              onSubmit={(e) => {
                e.preventDefault();
                this.addSelectedLibrary(this.input.value);
                e.target.reset();
              }}>
          <input type="text"
                 className="textbox"
                 placeholder="Search or add URL"
                 spellCheck="false"
                 onChange={this.onAddLibraryInputChange.bind(this)}
                 ref={input => this.input = input}/>
          {filtered.length === 0 && <div className="icon-buttons">
            <input type="image"
                   className="clickable"
                   src={images.plusCircleSmall}/>
            <img src={images.list}
                 className="clickable"
                 onClick={this.showDefaultLibraries.bind(this)}
                 alt="Show Default Libraries"/>
          </div>}
        </form>
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
              <img src={images.x}
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
    this.addSelectedLibrary(library.url, true);
    this.setState({ filtered: [] });
  }

  onAddLibraryInputChange(e) {
    const { defaultLibraries } = this.props;
    const searchRegex = new RegExp(e.target.value, 'gi');
    const filtered = defaultLibraries.filter(lib => lib.name.match(searchRegex));

    this.setState(({ filtered }));
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
