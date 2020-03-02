import styled, { css } from 'styled-components';

const textInput = css`
  appearance: none;
  background-color: transparent;
  border: 0.1rem solid ${p => p.theme.color.quaternary};
  border-radius: 0.4rem;
  box-shadow: none;
  box-sizing: inherit;
  font-size: 1.4rem;
  font-family: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  height: 3.8rem;
  margin-bottom: ${p => p.margin ? '1rem' : '0'};
  padding: 0.6rem 1rem;
  width: 100%;

  &:focus {
    border-color: ${p => p.theme.color[p.color]};
    outline: 0;
  }

  &::placeholder {
    color: ${p => p.theme.color.quaternary};
  }

  ${p => p.error && `border-color: ${p.theme.color.danger};`}
`;

export const Input = styled.input`${textInput}`;

Input.defaultProps = {
  color: 'primary'
};

export const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  -webkit-appearance: none;
  border: 0.1rem solid ${p => p.theme.color.tint};
  padding: 1.2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 0;
  }

  &:checked {
    border: 0.1rem solid ${p => p.theme.color[p.color]};
    color: var(--main-red);
  }

  &:checked:after {
    content: '\\2714';
    font-size: 1.5rem;
    color: ${p => p.theme.color[p.color]};
  }

  &:disabled,
  &:checked:disabled {
    border-color: ${p => p.theme.color.quaternary};
  }

  &:checked:disabled:after {
    color: ${p => p.theme.color.quaternary};
  }
`;

Checkbox.defaultProps = {
  color: 'primary'
};

export const TextArea = styled.textarea`
  ${textInput};
  min-height: 6.5rem;
`;

TextArea.defaultProps = {
  color: 'primary'
};

export const Select = styled.select`
  ${textInput};
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 29 14" width="29"><path fill="%23d1d1d1" d="M9.37727 3.625l5.08154 6.93523L19.54036 3.625"/></svg>') center right no-repeat;
  padding-right: 3rem;

  &:focus {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 29 14" width="29"><path fill="${p =>
  p.theme.color[
    p.color
    ]}" d="M9.37727 3.625l5.08154 6.93523L19.54036 3.625"/></svg>');
  }
`;

Select.defaultProps = {
  color: 'primary'
};

export const Label = styled.label`
  font-size: 1.3rem;
  font-weight: ${p => p.bold && 'bold'};
  color: ${p => p.error && p.theme.color.danger};
  display: ${p => p.block && 'block'};
`;

Label.defaultProps = {
  color: 'primary',
  bold: true,
};
