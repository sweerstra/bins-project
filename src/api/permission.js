import Request from './Request';
import { AUTH_API } from '../constants';

export default {
  getPermission(passphrase) {
    return Request.post(AUTH_API, { phrase: 'phrase', passphrase });
  },

  hasPermission() {
    const token = localStorage.getItem('phrase');
    if (token === null) return Promise.resolve(null);

    return this.getPermission(token);
  }
};
