import React from 'react';
import Settings from './Settings';
import { cleanup, fireEvent, render } from '../../test-utils';

const settings = {
  example: {
    label: 'Example',
    enabled: false,
    values: {
      example1: false,
      example2: true,
      example3: false
    }
  }
};

const onChange = jest.fn();
const setup = () => render(
  <Settings
    settings={settings}
    onChange={onChange}
  />
);

describe('<Settings />', () => {
  afterEach(cleanup);

  it('should render checkboxes correctly', () => {
  //   const { getByLabelText } = setup();

  //   const checkbox = getByLabelText('enabled');
  //   expect(checkbox).toBeInTheDocument();
  //   expect(checkbox.checked).toBe(true);

  //   Object.keys(settings.example.values)
  //     .forEach((key) => {
  //       expect(getByLabelText(key)).toBeInTheDocument();
  //     });

  //   // initial states
  //   expect(getByLabelText('example1').checked).toBe(false);
  //   expect(getByLabelText('example2').checked).toBe(true);
  });

  it('should trigger change on checkbox click only when section is enabled', () => {
  //   const { getByLabelText } = setup();

  //   expect(getByLabelText('example').disabled).toBe(false);

  //   // initially false
  //   const checkbox1 = getByLabelText('example1');
  //   expect(checkbox1.checked).toBe(false);
  //   fireEvent.click(checkbox1);
  //   expect(checkbox1.checked).toBe(true);

  //   expect(getByLabelText('example').disabled).toBe(false);
  //   fireEvent.click(getByLabelText('enabled'));
  //   expect(getByLabelText('example').disabled).toBe(true);

  //   expect(onChange).toHaveBeenCalledTimes(2);
  });
});
