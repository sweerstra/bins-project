import React from 'react';
import Editor from '../components/Editor/Editor';
import { useKeyDown } from '../hooks/event';
import { useSelectedBin } from '../context/SelectedBin';

function EditorContainer() {
  const { selectedBin, setSelectedBin } = useSelectedBin();

  useKeyDown(
    e => e.ctrlKey && e.key === 'Enter',
    true,
    () => runCode()
  );

  function onCodeChange(code) {
    setSelectedBin({ ...selectedBin, code });
  }

  function runCode() {
    if (!selectedBin.code.trim()) {
      return;
    }

    try {
      eval(selectedBin.code);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return (
    <Editor
      code={selectedBin.code}
      onCodeChange={onCodeChange}/>
  );
}

export default EditorContainer;
