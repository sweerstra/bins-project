import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useSettings } from '../context/Settings';

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
  const { settings } = useSettings();
  const [logs, setLogs] = useState([]);

  const consolesToUse = useMemo(() =>
    Object.entries(settings.consoles.values)
      .reduce((consoles, [console, shouldUse]) => {
        shouldUse && consoles.push(console);
        return consoles;
      }), [settings]);

  useEffect(() => {
    consolesToUse.forEach(type => {
      const log = console[type];
      console[type] = (...messages) => {
        const newLogs = messages.map(message => ({ text: parseToString(message), type }));
        setLogs([...logs, ...newLogs]);
      };
    });
  }, [consolesToUse]);

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

function parseToString(message) {
  let text = message;
  if (text === undefined || text === null) text = String(text);
  else if (typeof text === 'object') text = JSON.stringify(text);
  return text;
}
