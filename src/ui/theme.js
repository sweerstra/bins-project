import { injectGlobal } from 'styled-components';

export const theme = {
  color: {
    white: 'hsl(0, 0%, 100%)',
    black: 'hsl(0, 0%, 4%)',
    tint: 'hsl(207, 10%, 42%)',
    darkGrey: 'hsl(0, 0%, 21%)',
    turquoise: 'hsl(171, 100%, 41%)',
    cyan: 'hsl(204, 86%, 53%)',
    primary: 'hsl(217, 71%, 53%)',
    primaryDark: 'hsl(217, 71%, 49%)',
    secondary: '#2F2644',
    tertiary: '#f4f5f6',
    quaternary: '#d1d1d1',
    success: 'hsl(141, 71%, 48%)',
    successDark: 'hsl(141, 71%, 44%)',
    warning: 'hsl(48, 100%, 67%)',
    warningDark: 'hsl(48, 100%, 63%)',
    danger: 'hsl(348, 100%, 61%)',
    dangerDark: 'hsl(348, 100%, 57%)'
  },
  padding: {
    small: '1rem',
    medium: '2rem',
    large: '4rem'
  }
};

export const themeHoverSwitch = (props) => {
  switch (props.color) {
    case 'primary':
      return props.theme.color.primaryDark;
    case 'success':
      return props.theme.color.successDark;
    case 'warning':
      return props.theme.color.warningDark;
    case 'danger':
      return props.theme.color.dangerDark;
    default:
      return props.theme.color.secondary;
  }
};

injectGlobal`
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
    color: hsl(207, 10%, 42%);
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 1.6em; /* Currently ems cause chrome bug misinterpreting rems on body element */
    font-weight: 300;
    letter-spacing: .01em;
    line-height: 1.6;
    margin: 0;
  }
`;
