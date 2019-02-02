import Request from '../api/Request';
import { BINS_API } from '../constants';

export default {
  getBin: (id) => Request.get(`${BINS_API}/bin/${id}`),
  getBins: () => Request.get(`${BINS_API}/bins`),
  addBin: (bin) => Request.post(`${BINS_API}/bins`, bin),
  saveBin: ({ id, name, code }) => Request.put(`${BINS_API}/bin/${id}`, { name, code }),
  removeBin: (id) => Request.delete(`${BINS_API}/bin/${id}`)
};
