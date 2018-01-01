import api from '../api/bins';
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
  api.getBins().then((bins) => {
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

export const removeBin = (id) => (dispatch, getState) => {
  dispatch({ type: types.REMOVE_BIN, id });
  saveAll(getState());
};

const saveAll = (state) => {
  const bins = state.bins.bins || [];
  api.setBins(bins);
};

export const saveBin = (id, selection) => (dispatch, getState) => {
  dispatch({ type: types.SAVE_BIN, id, selection });
  saveAll(getState());
};

export const addAndSelectBin = (name, selection) => (dispatch, getState) => {
  dispatch(addBin(name, selection));
  const { bins: { bins } } = getState();
  dispatch(selectBin(bins[bins.length - 1]));
  saveAll(getState());
};

export const editBin = (id, name) => (dispatch, getState) => {
  dispatch({ type: types.EDIT_BIN, id, name });
  saveAll(getState());
};

export const addLog = (message, logType) => ({
  type: types.ADD_LOG,
  message,
  logType
});

export const clearConsole = () => ({
  type: types.CLEAR_CONSOLE
});

export const addLibrary = (name, url) => ({
  type: types.ADD_LIBRARY,
  name,
  url
});

export const removeLibrary = (index) => ({
  type: types.REMOVE_LIBRARY,
  index
});

export const toggleLibraries = (toggle) => ({
  type: types.TOGGLE_LIBRARIES,
  toggle
});
