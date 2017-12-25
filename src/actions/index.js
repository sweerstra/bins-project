import storage from '../api/bins';
import * as types from '../constants/ActionTypes'

export const requestBins = () => ({
  type: types.REQUEST_BINS
});

const receiveBins = bins => ({
  type: types.RECEIVE_BINS,
  bins
});

export const fetchBins = () => (dispatch) => {
  dispatch(requestBins());
  storage.getBins().then((bins) => {
    dispatch(receiveBins(bins));
  });
};

export const selectBin = bin => ({
  type: types.SELECT_BIN,
  bin
});

export const addBin = (name, selection = '') => ({
  type: types.ADD_BIN,
  name,
  selection
});

export const saveBin = (id, selection) => ({
  type: types.SAVE_BIN,
  id,
  selection
});


export const addAndSelectBin = (name, selection) => (dispatch, getState) => {
  dispatch(addBin(name, selection));
  const { bins: { bins } } = getState();
  dispatch(selectBin(bins[bins.length - 1]));
};

export const editBin = (id, name) => ({
  type: types.EDIT_BIN,
  id,
  name
});
