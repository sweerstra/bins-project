import React from 'react';
import Libraries from './Libraries';
import { fireEvent, render } from '../../test-utils';
import { libraries as presetLibraries } from '../../constants/presets';

const onAdd = jest.fn();
const onRemove = jest.fn();
const setup = (libraries = []) => render(
  <Libraries
    libraries={libraries}
    presets={presetLibraries}
    onAdd={onAdd}
    onRemove={onRemove}
  />
);

const TEST_LIBRARY_URL = 'https://library.com/library.js';
const TEST_LIBRARY_NAME = 'library.js';

describe('<Libraries />', () => {
  it('adds library for valid url', async () => {
    const { getByTestId, queryByTestId } = setup();
    expect(queryByTestId('libraries-empty-message')).toBeInTheDocument();

    const input = getByTestId('libraries-input');
    fireEvent.change(input, { target: { value: TEST_LIBRARY_URL } });
    fireEvent.submit(getByTestId('libraries-form'));

    expect(getByTestId('libraries-label').textContent).not.toMatch(/invalid/i);
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ url: TEST_LIBRARY_URL }));
  });

  it('shows error message for invalid url', () => {
    const { getByTestId, getByLabelText } = setup();
    const input = getByLabelText(/Search/i);
    fireEvent.change(input, { target: { value: 'unknown-library' } });
    fireEvent.submit(getByTestId('libraries-form'));

    expect(getByTestId('libraries-label').textContent).toMatch(/invalid/i);
  });

  it('suggests preset libraries while typing', () => {
    const { getByTestId, queryAllByTestId } = setup();
    expect(queryAllByTestId('libraries-suggestion')).toHaveLength(0);

    const input = getByTestId('libraries-input');
    fireEvent.change(input, { target: { value: 'lod' } });

    expect(queryAllByTestId('libraries-suggestion').map(s => s.textContent)).toContain('Lodash');
  });

  it('removes library', async () => {
    const libraries = [{ url: TEST_LIBRARY_URL, name: TEST_LIBRARY_NAME }];
    const { getAllByText, queryByTestId } = setup(libraries);
    expect(queryByTestId('libraries-empty-message')).not.toBeInTheDocument();

    const firstRemoveButton = getAllByText('×')[0];
    fireEvent.click(firstRemoveButton);

    expect(onRemove).toHaveBeenCalledWith(libraries[0]);
  });
});
