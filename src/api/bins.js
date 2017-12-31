import Request from '../api/Request';
import { BINS_API } from '../constants/Keys';

const getBins = () => {
  return Request.get(BINS_API);
};

const setBins = (bins) => {
  return Request.put(BINS_API, bins);
};

export default { getBins, setBins };
