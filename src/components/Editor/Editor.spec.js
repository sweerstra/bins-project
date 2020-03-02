import React from 'react';
import Editor from './Editor';
import { fireEvent, render, wait } from '../../test-utils';

const code = 'console.log(\'test\')';
const onCodeChange = jest.fn();
const setup = () => render(
  <Editor
    code={code}
    onCodeChange={onCodeChange}
  />
);

describe('<Editor />', () => {
  it('should render editor textarea', async () => {
    const { container } = setup();
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });
});
