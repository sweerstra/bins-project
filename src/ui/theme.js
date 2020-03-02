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