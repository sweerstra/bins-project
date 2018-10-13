import React, { Component } from 'react';
import Modal from '../components/Modal';
import Libraries from '../components/Libraries';

class LibrariesContainer extends Component {
  state = {
    libraries: [],
    presets: [
      {
        name: 'Lodash',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js'
      },
      {
        name: 'jQuery',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
      },
      {
        name: 'Moment.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js'
      },
      {
        name: 'date-fns',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.29.0/date_fns.min.js'
      }
    ]
  };

  addLibrary = (library) => {
    this.setState(state => ({ libraries: [...state.libraries, library] }));

    appendScriptToDOM(library.url);
  };

  removeLibrary = (library) => {
    this.setState(state => ({ libraries: state.libraries.filter(l => l.name !== library.name) }));

    removeScriptFromDOM(library.url);
  };

  render() {
    const { libraries, presets } = this.state;
    const { show, onHide } = this.props;

    return (
      <Modal
        isOpen={show}
        title="Libraries"
        onModalClose={onHide}>
        <Libraries
          libraries={libraries}
          presets={presets}
          onAdd={this.addLibrary}
          onRemove={this.removeLibrary}/>
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
