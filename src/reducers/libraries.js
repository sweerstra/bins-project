import { ADD_LIBRARY_IF_NEW, RECEIVE_DEFAULT_LIBRARIES, TOGGLE_LIBRARIES } from '../constants/ActionTypes';

const libraries = (state = { defaultLibraries: [], librariesVisible: false }, action) => {
  switch (action.type) {
    case RECEIVE_DEFAULT_LIBRARIES:
      return {
        ...state,
        defaultLibraries: action.defaultLibraries
      };

    case ADD_LIBRARY_IF_NEW:
      const { defaultLibraries } = state;
      const { name, url } = action.library;
      const index = defaultLibraries.findIndex(library => library.name === name);

      if (index === -1) return {
        ...state,
        defaultLibraries: [
          ...state.defaultLibraries,
          { name, url }
        ]
      };
      return state;

    case TOGGLE_LIBRARIES:
      return {
        ...state,
        librariesVisible: action.librariesVisible
      };

    default:
      return state;
  }
};

export default libraries;
