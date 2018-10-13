import React, { Component } from 'react';
import styled from 'styled-components';

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
  font-family: consolas;
`;

export const Unselectable = styled.span`
  user-select: none;
`;

class Console extends Component {
  state = {
    logs: []
  };

  componentDidMount() {
    this.overrideConsoleLog();
  }

  overrideConsoleLog() {
    const log = console.log;
    console.log = (...messages) => {
      log.apply(console, arguments);
      this.setState(state => ({ logs: [...state.logs, ...messages.map(Console.formatLog)] }));
    };

    window.log = log;
  }

  static formatLog(log) {
    if (log === undefined) return 'undefined';
    if (log === null) return 'null';
    if (typeof log === 'object') return JSON.stringify(log);
    return log;
  }

  render() {
    const { logs } = this.state;

    return (
      <Wrapper>
        {logs.map((log, index) =>
          <Log key={index}><Unselectable>{'> '}</Unselectable>{log}</Log>
        )}
      </Wrapper>
    );
  }
}

export default Console;
