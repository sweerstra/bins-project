import styled, { css } from 'styled-components';
import { themeHoverSwitch } from './theme';

export const Button = styled.button`
  background-color: ${p => p.theme.color[p.color]};
  border: 0.1rem solid ${p => p.theme.color[p.color]};
  border-radius: 0.4rem;
  color: ${p => p.theme.color.white};
  cursor: pointer;
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 700;
  height: 3.8rem;
  line-height: 3.8rem;
  letter-spacing: 0.1rem;
  margin-top: ${({ margin, marginTop }) => margin || marginTop ? '1rem' : '0'};
  margin-bottom: ${({ margin, marginBottom }) => margin || marginBottom ? '1rem' : '0'};
  padding: 0 3rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;

  &:focus,
  &:hover {
    background-color: ${themeHoverSwitch};
    border-color: ${themeHoverSwitch};
    color: ${p => p.theme.color.white};
    outline: 0;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;

    &:focus,
    &:hover {
      background-color: ${p => p.theme.color[p.color]};
      border-color: ${p => p.theme.color[p.color]};
    }
  }

   ${p =>
  p.outline &&
  css`
    background-color: transparent;
    color: ${p => p.theme.color[p.color]};

    &:focus,
    &:hover {
      background-color: transparent;
      border-color: ${themeHoverSwitch};
      color: ${themeHoverSwitch};

      &[disabled] {
        background-color: transparent;
        border-color: inherit;
        color: ${p => p.theme.color[p.color]};
      }
    }
  `}

  ${p =>
  p.clear &&
  css`
    background-color: transparent;
    border-color: transparent;
    color: ${p => p.theme.color[p.color]};

    &:focus,
    &:hover {
      background-color: transparent;
      border-color: transparent;
      color: ${themeHoverSwitch};

      &[disabled] {
        background-color: transparent;
        border-color: transparent;
        color: ${p => p.theme.color[p.color]};
      }
    }
  `}
  
  ${p => p.size === 'small' && css`
    font-size: .8rem;
    height: 2.8rem;
    line-height: 2.8rem;
    padding: 0 1.5rem;
  `}
  
  ${p => p.size === 'large' && css`
    font-size: 1.4rem;
    height: 4.5rem;
    line-height: 4.5rem;
    padding: 0 2rem;
  `}
`;

Button.defaultProps = {
  color: 'primary'
};

export const LinkButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  color: ${p => p.theme.color[p.color]};
  font-weight: bold;

  &:focus,
  &:hover {
    color: ${themeHoverSwitch};
    cursor: pointer;

    &[disabled] {
      color: ${p => p.theme.color[p.color]};
    }
  }
`;

LinkButton.defaultProps = {
  color: 'primary'
};

