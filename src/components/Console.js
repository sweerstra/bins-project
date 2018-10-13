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
  color: ${p => p.theme.color[p.color]};
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
    const createLogger = (type) => {
      const log = console[type];
      console[type] = (...messages) => {
        log.apply(console, arguments);
        this.setState(state => ({
          logs: [...state.logs, ...messages.map(message => Console.createConsoleMessage(message, type))]
        }));
      };
    };

    createLogger('log');
    createLogger('error');
  }

  static createConsoleMessage(message, type) {
    let text = message;
    if (text === undefined) text = 'undefined';
    if (text === null) text = 'null';
    if (typeof text === 'object') text = JSON.stringify(text);
    return { text, type };
  }

  render() {
    const { logs } = this.state;

    const logColors = {
      log: 'primary',
      error: 'danger',
      warn: 'warning'
    };

    return (
      <Wrapper>
        {logs.map(({ text, type }, index) =>
          <Log color={logColors[type]} key={index}><Unselectable>{'> '}</Unselectable>{text}</Log>
        )}
      </Wrapper>
    );
  }
}

export default Console;
