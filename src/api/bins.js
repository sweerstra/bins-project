import Request from '../api/Request';
import { BINS_API } from '../constants';

export const getBin = (id) => Request.get(`${BINS_API}/bin/${id}`);

export const getBins = () => Request.get(`${BINS_API}/bins`);

export const addBin = (bin) => Request.post(`${BINS_API}/bins`, bin);

export const saveBin = ({ id, name, code }) => Request.put(`${BINS_API}/bin/${id}`, { name, code });

export const removeBin = (id) => Request.delete(`${BINS_API}/bin/${id}`);
