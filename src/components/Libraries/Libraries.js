import React, { Component } from 'react';
import images from '../../assets/images';
import './Libraries.css';

class Libraries extends Component {
  constructor() {
    super();
    this.state = { filteredLibraries: [] };
  }

  componentWillReceiveProps({ defaultLibraries }) {
    if (defaultLibraries.length > this.props.defaultLibraries.length) {
      this.setState({ filteredLibraries: defaultLibraries });
    }
  }

  render() {
    const { filteredLibraries } = this.state;
    const { selectedLibraries, librariesVisible, onAddSelectedLibrary, onRemoveSelectedLibrary, onShowLibraryMenu, onHideLibraryMenu } = this.props;

    if (librariesVisible === false) {
      return (
        <div className="libraries-placeholder">
          Libraries
          <img src={images.plusCircleSmall}
               className="clickable"
               onClick={onShowLibraryMenu}
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
               onClick={onHideLibraryMenu}
               alt="Hide Libraries"/>
        </div>
        <form className="add-library"
              onSubmit={(e) => {
                e.preventDefault();
                onAddSelectedLibrary(this.input.value);
                e.target.reset();
              }}>
          <input type="text"
                 className="textbox"
                 placeholder="Search or add URL"
                 spellCheck="false"
                 onChange={this.onAddLibraryInputChange.bind(this)}
                 ref={input => this.input = input}/>
          {filteredLibraries.length === 0 && <div className="icon-buttons">
            <input type="image"
                   className="clickable"
                   src={images.plusCircleSmall}
                   alt="Add Library"/>
            <img src={images.list}
                 className="clickable"
                 onClick={this.showDefaultLibraries.bind(this)}
                 alt="Show Default Libraries"/>
          </div>}
        </form>
        <div className="autocomplete-suggestions">
          {filteredLibraries.map((suggestion, index) =>
            <p onClick={() => this.selectDefaultLibrary(suggestion)} key={index}>
              {suggestion.name}
            </p>
          )}
        </div>
        <div className="libraries">
          {selectedLibraries.map(({ name, url }, index) =>
            <div className="library" key={index}>
              <a href={url} target="about_blank">{name}</a>
              <img src={images.x}
                   className="clickable"
                   onClick={() => onRemoveSelectedLibrary(url, index)}
                   alt="Remove Library"/>
            </div>
          )}
        </div>
      </div>
    );
  }

  showDefaultLibraries() {
    this.setState({ filteredLibraries: this.props.libraries });
  }

  onAddLibraryInputChange(e) {
    const searchRegex = new RegExp(e.target.value, 'gi');
    const filteredLibraries = this.props.defaultLibraries.filter(lib => lib.name.match(searchRegex));

    this.setState(({ filteredLibraries }));
  }

  selectDefaultLibrary(library) {
    this.props.onAddSelectedLibrary(library.url, true);
    this.setState({ filteredLibraries: [] });
  }
}

export default Libraries;
