import {
  ADD_BIN,
  EDIT_BIN,
  RECEIVE_BINS,
  REMOVE_BIN,
  REQUEST_BINS,
  SAVE_BIN,
  SELECT_BIN,
  SELECT_BIN_BY_ID
} from '../constants/ActionTypes';

const updateBinsState = (bins, action, prop) => {
  return bins.map(bin =>
    bin._id === action._id
      ? { ...bin, [prop]: action[prop] }
      : bin
  );
};

const bins = (state = {
  bins: [],
  selectedBin: { _id: '', name: '', selection: '' },
  isFetching: false
}, action) => {
  switch (action.type) {
    case REQUEST_BINS:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_BINS:
      return {
        ...state,
        bins: action.bins,
        isFetching: false
      };

    case SELECT_BIN:
      return {
        ...state,
        selectedBin: action.bin
      };

    case SELECT_BIN_BY_ID:
      const { _id: id } = action;
      return {
        ...state,
        selectedBin: state.bins.find(bin => bin._id === id)
      };

    case ADD_BIN:
      const { _id, name, selection } = action;
      return {
        ...state,
        bins: [
          ...state.bins,
          { _id, name, selection }
        ]
      };

    case REMOVE_BIN:
      const index = state.bins.findIndex(bin => bin._id === action._id);
      if (index === -1) return state;

      return {
        ...state,
        bins: [
          ...state.bins.slice(0, index),
          ...state.bins.slice(index + 1)
        ]
      };

    case EDIT_BIN:
      return {
        ...state,
        bins: updateBinsState(state.bins, action, 'name')
      };

    case SAVE_BIN:
      return {
        ...state,
        bins: updateBinsState(state.bins, action, 'selection')
      };

    default:
      return state;
  }
};

export default bins;
