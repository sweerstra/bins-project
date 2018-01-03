import BinsApi from '../api/bins';
import LibrariesApi from '../api/libraries';
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
  BinsApi.getBins().then((bins) => {
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
  BinsApi.setBins(bins);
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

const receiveDefaultLibraries = (defaultLibraries) => ({
  type: types.RECEIVE_DEFAULT_LIBRARIES,
  defaultLibraries
});

export const fetchDefaultLibraries = () => (dispatch) => {
  LibrariesApi.getLibraries().then((libraries) => {
    dispatch(receiveDefaultLibraries(libraries));
  });
};

export const addDefaultLibraryIfNew = (library) => (dispatch, getState) => {
  const initialLength = getState().libraries.defaultLibraries.length;
  dispatch({ type: types.ADD_LIBRARY_IF_NEW, library });
  const { defaultLibraries } = getState().libraries;

  if (defaultLibraries.length > initialLength) {
    LibrariesApi.setLibraries(defaultLibraries);
  }
};

export const toggleLibraryMenu = (librariesVisible) => ({
  type: types.TOGGLE_LIBRARIES,
  librariesVisible
});
