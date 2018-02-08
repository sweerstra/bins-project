import Request from './Request';
import { BINS_API } from '../constants';

export default {
  getPermission(passphrase) {
    return Request.post(`${BINS_API}/auth`, { phrase: 'phrase', passphrase });
  },

  hasPermission() {
    const token = localStorage.getItem('phrase');
    if (token === null) return Promise.resolve(null);

    return this.getPermission(token);
  }
};
