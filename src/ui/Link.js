import styled, { css } from 'styled-components';
import { Link as BrowserRouterLink } from 'react-router-dom';

const base = css`
  color: ${p => p.theme.color[p.color]};
  margin-bottom: ${p => p.marginBottom ? '1rem' : '0'};
  text-decoration: none;
  
  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

export const Link = styled.a`
  ${base};
`;

export const RouterLink = styled(BrowserRouterLink)`
  ${base};
`;

const defaultProps = {
  color: 'primary'
};

Link.defaultProps = defaultProps;
RouterLink.defaultProps = defaultProps;
