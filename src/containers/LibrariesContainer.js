import React, { useState } from 'react';
import Modal from '../components/modals/Modal';
import Libraries from '../components/Libraries';
import { libraries as presetLibraries } from '../constants/presets';

export default function LibrariesContainer({ show, onHide }) {
  const [libraries, setLibraries] = useState([]);

  function addLibrary(library) {
    setLibraries([...libraries, library]);
    appendScriptToDOM(library.url);
  }

  function removeLibrary(library) {
    setLibraries(libraries.filter(l => l.name !== library.name));
    removeScriptFromDOM(library.url);
  }

  function appendScriptToDOM(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
  }

  function removeScriptFromDOM(src) {
    document.querySelectorAll('script').forEach(script => {
      if (script.src === src) {
        script.parentNode.removeChild(script);
      }
    });
  }

  return (
    <Modal
      isOpen={show}
      title="Libraries"
      onModalClose={onHide}>
      <Libraries
        libraries={libraries}
        presets={presetLibraries}
        onAdd={addLibrary}
        onRemove={removeLibrary}/>
    </Modal>
  );
}
