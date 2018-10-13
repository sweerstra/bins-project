import Request from '../api/Request';
import { BINS_API } from '../constants';

export const verify = (passphrase) => Request.post(`${BINS_API}/user/verify`, {
  username: 'testuser',
  password: passphrase
});

export const checkAuth = () => Request.get(`${BINS_API}/user`);
