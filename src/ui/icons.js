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
