import React, { Component } from 'react';
import images from '../../assets/images';
import './Libraries.css';

class Libraries extends Component {
  constructor() {
    super();
    this.state = { filteredLibraries: [] };
  }

  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  componentWillReceiveProps({ defaultLibraries }) {
    if (defaultLibraries.length > this.props.defaultLibraries.length) {
      this.setState({ filteredLibraries: defaultLibraries });
    }
  }

  render() {
    const { filteredLibraries } = this.state;
    const { selectedLibraries, onAddSelectedLibrary, onRemoveSelectedLibrary, onHideLibraryMenu } = this.props;

    return (
      <div className="libraries">
        <div className="libraries__header">
          Libraries
          <img src={images.minusCircle}
               className="clickable"
               onClick={onHideLibraryMenu}
               alt="Hide Libraries"/>
        </div>
        <form className="libraries__add"
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
          <input type="image"
                 className="clickable"
                 src={images.plusCircleSmall}
                 alt="Add Library"/>
        </form>
        <div className="libraries__autocompleted-suggestions">
          {filteredLibraries.map((suggestion, index) =>
            <p onClick={() => this.selectDefaultLibrary(suggestion)} key={index}>
              {suggestion.name}
            </p>
          )}
        </div>
        <div className="libraries__selected">
          {selectedLibraries.map(({ name, url }, index) =>
            <div className="library" key={index}>
              <a href={url} target="about_blank">{name}</a>
              <img src={images.xCircle}
                   className="clickable"
                   onClick={() => onRemoveSelectedLibrary(url, index)}
                   alt="Remove Library"/>
            </div>
          )}
        </div>
      </div>
    );
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
