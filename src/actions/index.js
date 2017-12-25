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

export const selectBin = id => ({
  type: types.SELECT_BIN,
  id
});

export const addBin = (name) => ({
  type: types.ADD_BIN,
  name
});

export const editBin = (id, name) => ({
  type: types.EDIT_BIN,
  id,
  name
});

export const fillBin = (id, selection) => ({
  type: types.FILL_BIN,
  id,
  selection
});
