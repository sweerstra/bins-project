import React, { Component } from 'react';
import Editor from '../components/Editor';

class EditorContainer extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      this.runCode();
    }
  };

  runCode = () => {
    const { code = '' } = this.props.bin;

    if (!code.trim()) {
      return;
    }

    try {
      eval(code);
    } catch (e) {
      console.error(e.message);
    }
  };

  render() {
    const { bin: { code }, onCodeChange } = this.props;

    return (
      <Editor
        code={code}
        onCodeChange={onCodeChange}/>
    );
  }
}

export default EditorContainer;
