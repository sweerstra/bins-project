import { ADD_LOG, CLEAR_CONSOLE } from '../constants/ActionTypes';

const logs = (state = [], action) => {
  switch (action.type) {
    case ADD_LOG:
      return [
        ...state,
        { message: action.message, logType: action.logType }
      ];

    case CLEAR_CONSOLE:
      return [];

    default:
      return state;
  }
};

export default logs;
