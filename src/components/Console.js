import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import SettingsContext from '../context/Settings';

const Wrapper = styled.div`
  grid-area: console;
  height: 20rem;
  overflow-y: auto;
  padding: ${p => p.theme.padding.medium};
  box-shadow: -.4rem 0 .6rem 0 ${props => props.theme.color.quaternary};
  z-index: 4;
  
  &::-webkit-scrollbar-track {
    background-color: ${p => p.theme.color.tertiary};
  }
  
  &::-webkit-scrollbar {
    width: 1rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.color.quaternary};
  }
`;

const Log = styled.div`
  color: ${p => p.theme.color[p.color]};
  font-family: consolas;
`;

const Unselectable = styled.span`
  user-select: none;
`;

export default function Console() {
  const { settings } = useContext(SettingsContext);
  const [logs, setLogs] = useState([]);

  const consolesToUse = Object.entries(settings.consoles)
    .filter(([type, value]) => value)
    .map(([type]) => type);

  console.log(consolesToUse);

  /* useEffect(() => {
    consolesToUse.forEach(type => {
      const log = console[type];
      console[type] = (...messages) => {
        const newLogs = messages.map(message => createConsoleMessage(message, type));
        setLogs([...logs, ...newLogs]);
        log.apply(console, messages);
      };
    });
  }, []);  */

  const colors = {
    log: 'primary',
    error: 'danger',
    warn: 'warning'
  };

  return (
    <Wrapper>
      {logs.map(({ text, type }, index) =>
        <Log color={colors[type]} key={index}>
          <Unselectable>> </Unselectable>{text}
        </Log>
      )}
    </Wrapper>
  );
}

function createConsoleMessage(message, type) {
  let text = message;
  if (text === undefined) text = 'undefined';
  else if (text === null) text = 'null';
  else if (typeof text === 'object') text = JSON.stringify(text);
  return { text, type };
}
