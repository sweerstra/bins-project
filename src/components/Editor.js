import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

const Wrapper = styled.div`
  grid-area: editor;
`;

const Editor = ({ code, onCodeChange }) => (
  <Wrapper>
    <AceEditor
      style={{ width: '100%', height: '100%' }}
      mode="javascript"
      theme="github"
      onChange={onCodeChange}
      value={code}
      fontSize={16}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2
      }}/>
  </Wrapper>
);

export default Editor;
