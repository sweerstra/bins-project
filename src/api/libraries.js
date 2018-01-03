import Request from '../api/Request';
import { LIBRARIES_API } from '../constants/Keys';

const getLibraries = () => {
  return Request.get(LIBRARIES_API);
};

const setLibraries = (libraries) => {
  return Request.put(LIBRARIES_API, libraries);
};

export default { getLibraries, setLibraries };
