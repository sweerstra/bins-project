import { css } from 'styled-components';

const flex = (alignItems, justifyContent) => css`
  display: flex;
  align-items: ${alignItems};
  justify-content: ${justifyContent};
`;

export const flexStart = flex('center', 'flex-start');

export const flexCenter = flex('center', 'center');

export const flexAround = flex('center', 'space-around');

export const flexBetween = flex('center', 'space-between');

export const boxShadow = css`
  box-shadow: 0 .2rem .6rem 0 hsla(0, 0%, 0%, 0.2);
`;
