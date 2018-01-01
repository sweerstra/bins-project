import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLibrary, removeLibrary, toggleLibraries } from '../../actions/index';
import './LibrariesContainer.css';
import assets from '../../assets/index';

class LibrariesContainer extends Component {
  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { libraries, onAddLibrary, onRemoveLibrary, toggle, onShowLibraries, onHideLibraries } = this.props;

    if (!toggle) {
      return (
        <div className="libraries-placeholder">
          Libraries
          <img src={assets.plusCircleSmall}
               className="clickable"
               onClick={() => onShowLibraries()}
               alt="Show Libraries"/>
        </div>
      );
    }

    return (
      <div className="Libraries-Container">
        <div className="libraries-header">
          <div>
            Libraries
          </div>
          <img src={assets.minusCircle}
               className="clickable"
               onClick={() => onHideLibraries()}
               alt="Hide Libraries"/>
        </div>
        <div className="add-library">
          <input className="textbox"
                 placeholder="Javascript URL..."
                 onKeyDown={(e) => {
                   if (e.keyCode === 13) {
                     onAddLibrary(this.input.value);
                     this.input.value = '';
                   }
                 }}
                 ref={input => this.input = input}/>
          <img src={assets.plusCircleSmall}
               className="clickable"
               onClick={() => {
                 onAddLibrary(this.input.value);
                 this.input.value = '';
               }}
               alt="Add Library"/>
        </div>
        <div className="libraries">
          {libraries.map(({ name, url }, index) =>
            <div className="library" key={index}>
              <a href={url} target="about_blank">{name}</a>
              <img src={assets.x}
                   className="clickable"
                   onClick={() => onRemoveLibrary(url, index)}
                   alt="Remove Library"/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const appendScript = (src) => {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
};

const removeScript = (src) => {
  Array.from(document.querySelectorAll('script')).forEach((script) => {
    if (script.src === src) {
      script.parentNode.removeChild(script);
    }
  });
};

const mapStateToProps = ({ libraries }) => ({ ...libraries });

const mapDispatchToProps = (dispatch) => ({
  onAddLibrary(url) {
    const parts = url.split('/');
    const name = parts[parts.length - 1];

    dispatch(addLibrary(name, url));
    appendScript(url);
  },
  onRemoveLibrary(url, index) {
    dispatch(removeLibrary(index));
    removeScript(url);
  },
  onShowLibraries: () => dispatch(toggleLibraries(true)),
  onHideLibraries: () => dispatch(toggleLibraries(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(LibrariesContainer);
