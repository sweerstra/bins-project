import { CONFIRM_PERMISSION, PERMISSION_REQUEST } from '../constants/ActionTypes';

const permission = (state = { isFetching: false, hasPermission: !!localStorage.getItem('phrase') }, action) => {
  switch (action.type) {
    case PERMISSION_REQUEST:
      return {
        isFetching: true,
        hasPermission: false
      };

    case CONFIRM_PERMISSION:
      return {
        isFetching: false,
        hasPermission: true
      };

    default:
      return state;
  }
};

export default permission;
