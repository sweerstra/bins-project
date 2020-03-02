import React from 'react';
import Bins from './Bins';
import { fireEvent, render, cleanup } from '../../test-utils';

const bins = [{ id: '1', name: 'First', code: 'code.first' }, { id: '2', name: 'Second', code: 'code.second' }];
const onSelect = jest.fn();
const onCreate = jest.fn();
const onSave = jest.fn();
const onRemove = jest.fn();
const onSearch = jest.fn();
const initialProps = {
  bins,
  selected: {},
  onSelect,
  onCreate,
  onSave,
  onRemove,
  onSearch
};
const setup = additionalProps => render(<Bins {...initialProps} {...additionalProps}/>);

describe('<Bins />', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('creates new bin on button click', () => {
    const { getByText } = setup();
    fireEvent.click(getByText(/Create/i));
    expect(onCreate).toHaveBeenCalled();
  });

  it('triggers search on input change', () => {
    const { getByLabelText } = setup();
    fireEvent.change(getByLabelText(/Search/i), { target: { value: 'Search text' } });
    expect(onSearch).toHaveBeenCalled();
  });

  it('renders bin items', () => {
    const { getByText } = setup();
    bins.forEach(bin => {
      expect(getByText(bin.name)).toBeInTheDocument();
    });
  });

  it('selects item on click', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('First'));
    expect(onSelect).toHaveBeenCalledWith(bins[0]);
  });

  it('deletes item on click', () => {
    const { getAllByText } = setup();
    const firstDeleteButton = getAllByText(/Delete/i)[0];
    fireEvent.click(firstDeleteButton);
    expect(onRemove).toHaveBeenCalledWith(bins[0]);
  });

  it('doesn\'t save bin without code', () => {
    const { getByText } = setup();
    fireEvent.click(getByText(/Save/i));
    expect(onSave).not.toHaveBeenCalled();
  });

  it('doesn\'t save bin on first load', () => {
    const { getByText } = setup();
    fireEvent.click(getByText('First'));
    fireEvent.click(getByText(/Save/i));
    expect(onSave).not.toHaveBeenCalled();
  });

  it('saves bin with code', () => {
    const [firstBin] = bins;
    const { getByText } = setup({ selected: firstBin });
    fireEvent.click(getByText(/Save/i));
    expect(onSave).toHaveBeenCalledWith(firstBin);
  });
});
