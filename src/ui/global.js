import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  /* Set box-sizing globally to handle padding and border widths */
  *,
  *:after,
  *:before {
    box-sizing: inherit;
  }
  
  /* The base font-size is set at 62.5% for having the convenience
     of sizing rems in a way that is similar to using px: 1.6rem = 16px */
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  
  body {
    color: ${p => p.theme.color.tint};
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 1.6em; /* Currently ems cause chrome bug misinterpreting rems on body element */
    font-weight: 300;
    letter-spacing: .01em;
    line-height: 1.6;
    margin: 0;
  }
`;
