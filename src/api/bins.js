import Request from '../api/Request';
import { BINS_API } from '../constants/Keys';

const getBins = () => {
  return Request.get(`${BINS_API}/bins`);
};

const addBin = (bin) => {
  return Request.post(`${BINS_API}/bin`, bin);
};

const saveBin = (bin) => {
  return Request.put(`${BINS_API}/bin`, bin);
};

const removeBin = (_id) => {
  return Request.delete(`${BINS_API}/bin/${_id}`);
};

export default { getBins, addBin, saveBin, removeBin };
