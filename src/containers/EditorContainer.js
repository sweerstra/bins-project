import React from 'react';
import Editor from '../components/Editor';
import { useKeyDown } from '../hooks/event';

function EditorContainer({ bin, onCodeChange }) {
  useKeyDown(e => e.ctrlKey && e.key === 'Enter', e => {
    e.preventDefault();
    runCode();
  });

  const { code = '' } = bin;

  function runCode() {
    if (!code.trim()) {
      return;
    }

    try {
      eval(code);
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Editor
      code={code}
      onCodeChange={onCodeChange}/>
  );
}

export default EditorContainer;
