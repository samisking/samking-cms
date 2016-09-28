import { combineReducers } from 'redux';

import api from './api';
import auth from './auth';

export default combineReducers({
  api,
  auth
});
