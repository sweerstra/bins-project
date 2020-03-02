import React from 'react';
import BinsContainer from './BinsContainer';
import { cleanup, fireEvent, render, renderWithRouter, wait, waitForElement } from '../test-utils';
import Api from '../api/bins';
import { SelectedBinContext } from '../context/SelectedBin';

jest.mock('../api/bins');

const selectedBin = {};
const setSelectedBin = jest.fn();
const setup = routerParams => renderWithRouter(
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
    jest.clearAllMocks();
  });

  it('fetches bins', async () => {
    const { getAllByText } = setup({ route: '/bins' });

    await wait(() => {
      expect(Api.getBins).toHaveBeenCalledTimes(1);
      expect(getAllByText(/Bin [a-z]{6}/i)).toHaveLength(2);
    });
  });

  it('filters bins based on search input', async () => {
    const { getByLabelText, getAllByText } = setup({ route: '/bins' });

    await wait(() => {
      expect(getAllByText(/Bin [a-z]{6}/i)).toHaveLength(2);
      fireEvent.change(getByLabelText(/Search/i), { target: { value: 'abcd' } });
      expect(getAllByText(/Bin [a-z]{6}/i)).toHaveLength(1);
    });
  });

  it('won\'t fetch selected bin without id provided inside route', async () => {
    setup({ route: '/bins' });

    await wait(() => {
      expect(Api.getBin).not.toHaveBeenCalled();
    });
  });

  it('fetches selected bin when id provided inside route', async () => {
    setup({ route: '/bins/abcdef' });

    await wait(() => {
      expect(Api.getBin).toHaveBeenCalledTimes(1);
      expect(Api.getBin).toHaveBeenCalledWith('abcdef');
    });
  });

  it('updates context and changes url with id when bin is selected', async () => {
    const { getByText, history } = setup({ route: '/bins' });

    await wait(() => {
      expect(history.location.pathname).toEqual('/bins');
      fireEvent.click(getByText('Bin abcdef'));
      expect(setSelectedBin).toHaveBeenCalledTimes(1);
      expect(getByText('Bin abcdef')).toHaveStyle('font-weight', 'bold'); // active style
      expect(history.location.pathname).toEqual('/bins/abcdef');
    });
  });

  it('creates bin and selects it', async () => {
    const { getByText, getByTestId, getByLabelText, getAllByText, history } = setup({ route: '/bins' });

    await wait(() => {
      fireEvent.click(getByText(/Create New Bin/i));
      expect(getByTestId('modal-container')).toBeVisible();
      fireEvent.change(getByLabelText('Name', { container: getByTestId('modal-container') }), { target: { value: 'mnopqr' } });
      fireEvent.click(getByText('Save', { container: getByTestId('modal-container') }));
    });

    await waitForElement(() => getByTestId('modal-container'));
    expect(Api.addBin).toHaveBeenCalledTimes(1);
    expect(Api.addBin).toHaveBeenCalledWith({ name: 'mnopqr' });
    expect(getByTestId('modal-container')).not.toBeVisible();
    expect(getByLabelText('Name', { container: getByTestId('modal-container') }).value).toEqual('');
    expect(getByLabelText(/Search/i).value).toBe('');
    expect(getAllByText(/Bin [a-z]{6}/i)).toHaveLength(3);
    expect(setSelectedBin).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toEqual('/bins/mnopqr');
  });

  it('saves existing bin', async () => {
    const { getByText, getByTestId, getByLabelText, getAllByText, history } = setup({ route: '/bins/abcdef' });

    await wait(() => {
      expect(Api.saveBin).toHaveBeenCalledTimes(1);
      expect(Api.saveBin).toHaveBeenCalledWith(expect.objectContaining({ name: 'abcdef' }));
    });
    // mock Api.saveBin()
    // on keydown ctrl + 's' -> expect save
    // depending on if bin is selected opens modal?
  });

  it('opens modal when saving before creating bin', () => {
    // mock Api.saveBin()
    // on keydown ctrl + 's' -> expect save
    // depending on if bin is selected opens modal?
  });

  it('removes bin', () => {
    // mock Api.removeBin()
    // also assert empty object as bin
  });
});
