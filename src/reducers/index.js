import { combineReducers } from 'redux';
import bins from './bins';
import logs from './logs';
import libraries from './libraries';
import permission from './permission';

export default combineReducers({
  bins,
  logs,
  libraries,
  permission
});
