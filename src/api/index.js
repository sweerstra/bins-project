import Request from '../api/Request';
import { BINS_API, LIBRARIES_API } from '../constants';

export default {
  Bins: {
    getBin: (id) => Request.get(`${BINS_API}/bin/${id}`),
    getBins: () => Request.get(`${BINS_API}/bins`),
    addBin: (bin) => Request.post(`${BINS_API}/bin`, bin),
    saveBin: (bin) => Request.put(`${BINS_API}/bin`, bin),
    removeBin: (id) => Request.delete(`${BINS_API}/bin/${id}`)
  },
  Libraries: {
    getLibraries: () => Request.get(LIBRARIES_API),
    setLibraries: (libraries) => Request.put(LIBRARIES_API, libraries)
  },
  Permission: {
    getPermission: (passphrase) => Request.post(`${BINS_API}/auth`, { phrase: 'phrase', passphrase }),
    hasPermission() {
      const token = localStorage.getItem('phrase');
      if (token === null) return Promise.resolve(null);
      return this.getPermission(token);
    }
  },
  Data: {
    getCodeFromFile: async (url) => ({
      name: url.split('/').pop(),
      selection: await Request.getText(url)
    })
  }
};
