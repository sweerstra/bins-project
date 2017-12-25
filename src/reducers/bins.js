import { combineReducers } from 'redux';
import { ADD_BIN, EDIT_BIN, FILL_BIN, RECEIVE_BINS, REQUEST_BINS, SELECT_BIN } from '../constants/ActionTypes';

const bins = (state = { fetching: false, bins: [] }, action) => {
  switch (action.type) {
    case REQUEST_BINS:
      return {
        ...state,
        fetching: true
      };
    case RECEIVE_BINS:
      return {
        ...state,
        fetching: false,
        bins: action.bins,
      };
    case ADD_BIN:
      const id = Math.max(...state.bins.map(bin => bin.id)) + 1;
      return {
        ...state,
        bins: [...state.bins, { id, name: action.name, selection: '' }]
      };
    case EDIT_BIN:
      return {
        ...state,
        bins: state.bins.map(bin =>
          bin.id === action.id ?
            { ...bin, name: action.name } :
            bin
        )
      };
    default:
      return state;
  }
};

const selectedBin = (state = { id: 0, selection: '' }, action) => {
  switch (action.type) {
    case SELECT_BIN:
      return {
        ...state,
        id: action.id
      };
    case FILL_BIN:
      return {
        ...state,
        selection: action.selection
      };
    default:
      return state;
  }
};

export default combineReducers({ bins, selectedBin });
