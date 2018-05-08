import { combineReducers } from 'redux';
import auth from './auth/auth_reducer';
import global from './global/global_reducer';
import pages from './pages/pages_reducer';

export default combineReducers({
  auth,
  global,
  pages
});
