import React from 'react';
import BinsContainer from './BinsContainer';
import { createMockBin } from '../api/__mocks__/bins';
import { cleanup, fireEvent, renderWithRouter, wait, waitForElement } from '../test-utils';
import Api from '../api/bins';
import { SelectedBinContext } from '../context/SelectedBin';

jest.mock('../api/bins');

const setSelectedBin = jest.fn();
const setup = (routerParams, selectedBin = {}) => renderWithRouter(
  <SelectedBinContext.Provider value={{ selectedBin, setSelectedBin }}>
    <BinsContainer />
  </SelectedBinContext.Provider>,
  {
    ...routerParams,
    path: '/bins/:id?'
  }
);

describe('<BinsContainer />', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('fetches bins', async () => {
    const { getAllByText } = setup({ route: '/bins' });

    await wait();
    expect(Api.getBins).toHaveBeenCalledTimes(1);
    expect(getAllByText(/Bin [a-z]{6}/i)).toHaveLength(2);
  });

  it('filters bins based on search input', async () => {
    const { getByLabelText, getAllByText } = setup({ route: '/bins' });

    await wait();
    expect(getAllByText(/Bin [a-z]{6}/i)).toHaveLength(2);
    fireEvent.change(getByLabelText(/Search/i), { target: { value: 'abcd' } });
    expect(getAllByText(/Bin [a-z]{6}/i)).toHaveLength(1);
  });

  it('won\'t fetch selected bin without id provided inside route', async () => {
    setup({ route: '/bins' });

    await wait();
    expect(Api.getBin).not.toHaveBeenCalled();
  });

  it('fetches selected bin when id provided inside route', async () => {
    setup({ route: '/bins/abcdef' });

    await wait();
    expect(Api.getBin).toHaveBeenCalledTimes(1);
    expect(Api.getBin).toHaveBeenCalledWith('abcdef');
  });

  it('updates context and changes url with id when bin is selected', async () => {
    const { getByText, history } = setup({ route: '/bins' });

    await wait();
    expect(history.location.pathname).toEqual('/bins');
    fireEvent.click(getByText('Bin abcdef'));
    expect(setSelectedBin).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toEqual('/bins/abcdef');
  });

  it('resets url when bin is not found', async () => {
    Api.getBin.mockRejectedValueOnce(new Error('Not found'));

    const { history } = setup({ route: '/bins/mnopqr' }); // <- non-existing bin

    await wait();
    expect(history.location.pathname).toEqual('/bins');
  });

  it('creates bin and selects it', async () => {
    const { getByText, getByTestId, getByLabelText, getAllByText, history } = setup({ route: '/bins' });

    await wait();
    fireEvent.click(getByText(/Create New Bin/i));
    expect(getByTestId('create-bin-modal')).toBeVisible();
    fireEvent.change(getByLabelText('Name', { container: getByTestId('create-bin-modal') }), { target: { value: 'mnopqr' } });
    fireEvent.click(getByText('Save', { container: getByTestId('create-bin-modal') }));

    await waitForElement(() => getByTestId('create-bin-modal'));
    expect(Api.addBin).toHaveBeenCalledTimes(1);
    expect(Api.addBin).toHaveBeenCalledWith({ name: 'mnopqr' });
    expect(getByTestId('create-bin-modal')).not.toBeVisible();
    expect(getByLabelText('Name', { container: getByTestId('create-bin-modal') }).value).toEqual('');
    expect(getByLabelText(/Search/i).value).toBe('');
    expect(getAllByText(/Bin [a-z]{6}/i)).toHaveLength(3);
    expect(setSelectedBin).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toEqual('/bins/mnopqr');
  });

  it('saves existing bin when clicked on save button', async () => {
    const { getByText } = setup({ route: '/bins/abcdef' }, createMockBin('abcdef'));

    await wait();
    fireEvent.click(getByText('Save Bin'));
    await wait();

    expect(Api.saveBin).toHaveBeenCalledTimes(1);
    expect(Api.saveBin).toHaveBeenCalledWith(expect.objectContaining({ name: 'Bin abcdef' }));
  });

  it('handles saving on ctrl + s keypress', async () => {
    setup({ route: '/bins/abcdef' }, createMockBin('abcdef'));

    await wait();
    fireEvent.keyDown(window, { ctrlKey: true, key: 's' });
    await wait();
    expect(Api.saveBin).toHaveBeenCalledTimes(1);
    expect(Api.saveBin).toHaveBeenCalledWith(expect.objectContaining({ name: 'Bin abcdef' }));
  });

  it('opens modal when saving while creating new bin', async () => {
    const { getByText, getByTestId } = setup({ route: '/bins' }, { code: 'console.log(\'new\');' });

    await wait();
    fireEvent.click(getByText('Save Bin'));
    expect(Api.saveBin).not.toHaveBeenCalled();

    await waitForElement(() => getByTestId('create-bin-modal'));
    expect(getByTestId('create-bin-modal')).toBeVisible();
  });

  it('removes bin and resets selected bin if removed', async () => {
    const { getByText, queryByText, history } = setup({ route: '/bins/ghijkl' }, createMockBin('ghijkl'));

    await wait();
    expect(getByText('Bin abcdef')).toBeInTheDocument();
    fireEvent.click(getByText('Bin abcdef').querySelector('button'));
    expect(Api.removeBin).toHaveBeenCalledTimes(1);
    expect(Api.removeBin).toHaveBeenCalledWith('abcdef');
    expect(queryByText('Bin abcdef')).not.toBeInTheDocument();
    expect(history.location.pathname).toEqual('/bins/ghijkl');

    // remove selected bin
    expect(getByText('Bin ghijkl')).toBeInTheDocument();
    fireEvent.click(getByText('Bin ghijkl').querySelector('button'));
    expect(queryByText('Bin ghijkl')).not.toBeInTheDocument();
    expect(setSelectedBin).toHaveBeenLastCalledWith({});
    expect(history.location.pathname).toEqual('/bins');
  });
});
