import { combineReducers } from 'redux';
import {
  ADD_BIN,
  EDIT_BIN,
  RECEIVE_BINS,
  REMOVE_BIN,
  REQUEST_BINS,
  SAVE_BIN,
  SELECT_BIN
} from '../constants/ActionTypes';

const updateBinProperty = (state, action, prop) => {
  return {
    ...state,
    bins: state.bins.map(bin =>
      bin.id === action.id
        ? { ...bin, [prop]: action[prop] }
        : bin
    )
  };
};

const bins = (state = { bins: [], fetching: false }, action) => {
  switch (action.type) {
    case REQUEST_BINS:
      return {
        ...state,
        fetching: true
      };
    case RECEIVE_BINS:
      return {
        bins: action.bins,
        fetching: false
      };
    case ADD_BIN:
      const id = state.bins.length
        ? Math.max(...state.bins.map(bin => bin.id)) + 1
        : 1;
      return {
        ...state,
        bins: [...state.bins, { id, name: action.name, selection: action.selection }]
      };
    case REMOVE_BIN:
      const index = state.bins.findIndex(bin => bin.id === action.id);
      if (index === -1) return state;

      return {
        ...state,
        bins: [
          ...state.bins.slice(0, index),
          ...state.bins.slice(index + 1)
        ]
      };
    case EDIT_BIN:
      return updateBinProperty(state, action, 'name');
    case SAVE_BIN:
      return updateBinProperty(state, action, 'selection');
    default:
      return state;
  }
};

const selectedBin = (state = { id: 0, name: '', selection: '' }, action) => {
  switch (action.type) {
    case SELECT_BIN:
      return action.bin;
    default:
      return state;
  }
};

export default combineReducers({ bins, selectedBin });
