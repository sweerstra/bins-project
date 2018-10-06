import styled, { css } from 'styled-components';

const base = css`
  color: ${props => props.color && props.theme.color[props.color]};
  font-weight: ${props => props.bold ? '700' : '300'};
  letter-spacing: -0.1rem;
  margin-bottom: ${props => (props.marginBottom ? '2rem' : '0')};
  margin-top: ${props => (props.marginTop ? '2rem' : '0')};
`;

export const Title = styled.h1`
  ${base};
  font-size: 4.6rem;
  line-height: 1.2;
`;

export const Heading = styled.h2`
  ${base};
  font-size: 3.6rem;
  line-height: 1.25;
`;

export const SubTitle = styled.h3`
  ${base};
  font-size: 2.8rem;
  line-height: 1.3;
`;

export const SmallTitle = styled.h4`
  ${base};
  font-size: 2.2rem;
	letter-spacing: -.08rem;
	line-height: 1.35;
`;
