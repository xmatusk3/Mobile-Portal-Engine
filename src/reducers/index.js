import { combineReducers } from 'redux';
import auth from './auth/auth_reducer';
import global from './global/global_reducer';
import pages from './pages/pages_reducer';
import workflows from './workflows/workflows_reducer';
import selectedItem from './selectedItem/selectedItem_reducer';

export default combineReducers({
  auth,
  global,
  pages,
  workflows,
  selectedItem
});
