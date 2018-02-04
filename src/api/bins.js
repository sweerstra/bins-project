import Request from '../api/Request';
import { BINS_API } from '../constants';

const getBin = (_id) => {
  return Request.get(`${BINS_API}/bin/${_id}`);
};

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

export default { getBin, getBins, addBin, saveBin, removeBin };
