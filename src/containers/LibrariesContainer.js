import React, { Component } from 'react';
import Modal from '../components/Modal';
import Libraries from '../components/Libraries';

class LibrariesContainer extends Component {
  state = {
    url: '',
    libraries: [],
    error: false
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addLibrary = (e) => {
    e.preventDefault();

    const { url } = this.state;
    const name = url.split('/').pop();

    if (!name) {
      return this.setState({ error: true });
    }

    const library = { name, url };
    this.setState(state => ({ libraries: [...state.libraries, library], url: '', error: false }));

    appendScriptToDOM(url);
  };

  removeLibrary = (library) => {
    this.setState(state => ({
      libraries: state.libraries.filter(lib => lib.url !== library.url)
    }));

    removeScriptFromDOM(library.url);
  };

  render() {
    const { url, libraries, error } = this.state;
    const { show, onHide } = this.props;

    return (
      <Modal
        isOpen={show}
        title="Libraries"
        onModalClose={onHide}>
        <Libraries
          url={url}
          libraries={libraries}
          onAdd={this.addLibrary}
          onChange={this.onChange}
          onRemove={this.removeLibrary}
          error={error}/>
      </Modal>
    );
  }
}

const appendScriptToDOM = (src) => {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
};

const removeScriptFromDOM = (src) => {
  document.querySelectorAll('script').forEach(script => {
    if (script.src === src) {
      script.parentNode.removeChild(script);
    }
  });
};

export default LibrariesContainer;
