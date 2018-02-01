import BinsApi from '../api/bins';
import LibrariesApi from '../api/libraries';
import * as types from '../constants/ActionTypes';

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

const addBin = (_id = '', name = '', selection = '') => ({
  type: types.ADD_BIN,
  _id,
  name,
  selection
});

export const removeBin = (_id) => (dispatch) => {
  dispatch({ type: types.REMOVE_BIN, _id });
  BinsApi.removeBin(_id);
};

export const saveBin = (_id, selection) => (dispatch) => {
  dispatch({ type: types.SAVE_BIN, _id, selection });
  BinsApi.saveBin({ _id, selection });
};

export const addAndSelectBin = (name, selection) => (dispatch) => {
  BinsApi.addBin({ name, selection })
    .then(({ insertedId: _id }) => {
      dispatch(addBin(_id, name, selection));
      dispatch(selectBin({ _id, name, selection }));
    });
};

export const editBin = (_id, name) => (dispatch) => {
  dispatch({ type: types.EDIT_BIN, _id, name });
  BinsApi.saveBin({ _id, name });
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
