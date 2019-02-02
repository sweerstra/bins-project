import Request from '../api/Request';
import { BINS_API } from '../constants';

export const verify = (username, password) => Request.post(`${BINS_API}/user/verify`, {
  username,
  password
});

export const checkAuth = () => Request.get(`${BINS_API}/user`);
