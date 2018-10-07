import React from 'react';
import styled, { css } from 'styled-components';

const Icon = styled.svg.attrs({
  viewBox: '0 0 24 24'
})`
    stroke: ${p => p.theme.color.primary};
    fill: transparent;
    width: 2.4rem;
    height: 2.4rem;
    stroke-width: 2;
    stroke-linecap: round;
    
    ${p => p.hover && css`&:hover {
      stroke: ${p => p.theme.color.secondary};
      cursor: pointer;
    }`}
`;

Icon.defaultp = {
  color: 'secondary'
};

export const DeleteIcon = (props) => (
  <Icon {...props}>
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </Icon>
);
